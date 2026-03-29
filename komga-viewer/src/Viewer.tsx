import { useEffect, useState, useRef } from "react";

import { getBookId } from "@/utils/url";
import { buildPageList, convertToDisplayPage, convertToOriginalPage } from "@/utils/pages";
import { fetchBook, fetchPages } from "@/api";
import { PageFlipBook } from "@/components/PageFlipBook";
import { ClickLayer } from "@/components/viewer/ClickLayer";
import { OverlayMenu } from "@/components/viewer/OverlayMenu";

export default function Viewer() {
  const bookId = getBookId(location.pathname);
  if (!bookId) {
    return <h2>読み込み失敗</h2>;
  }
  const safeBookId: string = bookId;

  const flipRef = useRef<any>(null);

  const [title, setTitle] = useState("");
  const [pages, setPages] = useState<string[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuHover, setMenuHover] = useState(false);

  // スライダーと同期するための現在ページ
  const [currentPage, setCurrentPage] = useState(pages.length - 1);

  useEffect(() => {
    async function load() {
      const [book, pageJson] = await Promise.all([
        fetchBook(safeBookId),
        fetchPages(safeBookId),
      ]);

      setTitle(book.metadata?.title ?? "");
      setPages(buildPageList(safeBookId, pageJson));
    }
    load();
  }, [safeBookId]);

  // pages がセットされた後に PageFlipBook の初期ページを同期
  useEffect(() => {
    if (!flipRef.current) return;

    setCurrentPage(pages.length - 1);

    const inst = flipRef.current.pageFlip?.();
    if (!inst) return;

    setCurrentPage(inst.getCurrentPageIndex());
  }, [pages]);

  const total = pages.length - 2;
  const displayPage = convertToDisplayPage(currentPage, total);

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <PageFlipBook
        ref={flipRef}
        pages={pages}
        startPage={currentPage}
        showPageCorners={!menuHover}
        onFlip={(page) => setCurrentPage(page)}
      />
      <ClickLayer onCenterClick={() => setMenuVisible(v => !v)} />
      <OverlayMenu
        visible={menuVisible}
        current={displayPage}
        total={total}
        title={title}
        onChangePage={(page) => {
          const originalPage = convertToOriginalPage(page, total);
          flipRef.current?.pageFlip()?.turnToPage(originalPage)
        }}
        onHoverMenu={(hover) => setMenuHover(hover)}
        onBack={() => console.log("Back")}
        onToggleFullscreen={() => console.log("ToggleFullscreen")}
      />
    </div>
  );
}