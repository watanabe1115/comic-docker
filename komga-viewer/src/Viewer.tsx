import { useEffect, useState } from "react";

import { fetchPages }   from "@/api";
import { PageFlipBook } from "@/components/PageFlipBook";

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

    return <PageFlipBook pages={pages} />;
}