import HTMLFlipBook from "react-pageflip";
import { useEffect, useState } from "react";
import { fetchPages } from "./api";

/**
 * URL パスから bookId を抽出する。
 * 例: "/book/ABC123/read" → "ABC123"
 *
 * @param path URL のパス部分（location.pathname）
 * @returns bookId（見つからない場合は undefined）
 */
function getBookId(path: string): string | undefined  {
  const match = path.match(/^\/book\/([^/]+)\/read/);
  return match?.[1];
}

export default function Viewer() {
    const bookId = getBookId(location.pathname);
    if (!bookId) {
        return <h2>読み込み失敗</h2>;
    }
    const safeBookId: string = bookId;

    const [pages, setPages] = useState<string[]>([]);

    const BLACK_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AARwMBgQAAAABJRU5ErkJggg==";
    
    useEffect(() => {
        async function load() {
            const json = await fetchPages(safeBookId);
            const urls = json.map((p: any) =>
                `/api/v1/books/${bookId}/pages/${p.number - 1}?zero_based=true`
            );
            // 先頭と末尾に黒画像を追加
            urls.unshift(BLACK_IMAGE);
            urls.push(BLACK_IMAGE);
           
            urls.reverse();

            setPages(urls);
        }

        load();
    }, [bookId]);

    return (
<div
  style={{
    position: "fixed",
    inset: 0,
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  }}
>
  <HTMLFlipBook
    width={850}
    height={1200}
    size="stretch"
    minWidth={300}
    maxWidth={2000}
    minHeight={400}
    maxHeight={3000}
    drawShadow={true}
    maxShadowOpacity={0.4}
    flippingTime={800}
    usePortrait={true}
    showCover={false}
    mobileScrollSupport={true}
    // direction="rtl"
    startPage={pages.length - 1}
    style={{
      width: "100%",
      height: "100%",        // ← これが重要！
      objectFit: "contain",   // ← FlipBook 全体を縮小して収める
      backgroundColor: "#000"
    }}
  >
    {pages.map((url, i) => (
      <img
        key={i}
        src={url}
        alt={`page-${i}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    ))}
  </HTMLFlipBook>
</div>


    );
}