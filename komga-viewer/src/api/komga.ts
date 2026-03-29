/**
 * 指定した書籍の「ページ一覧」を Komga から取得します。
 *
 * Komga API:
 *   GET /api/v1/books/{bookId}/pages
 *
 * このエンドポイントは PageDto の配列を返します。
 * PageDto には以下の情報が含まれます:
 *   - number: ページ番号（1 から始まる）
 *   - fileName: 元のファイル名
 *   - mediaType: MIME タイプ（例: "image/jpeg"）
 *   - width, height: 画像サイズ（利用可能な場合）
 *
 * @param {string} bookId - ページ一覧を取得したい書籍の ID
 * @returns {Promise<any[]>} ページ情報（PageDto）の配列を返す Promise
 */
export async function fetchPages(bookId: string) {
  const res = await fetch(`/api/v1/books/${bookId}/pages`, {
    credentials: "include",
  });
  return res.json();
}


/**
 * 指定した書籍の「書籍情報（BookDto）」を Komga から取得します。
 *
 * Komga API:
 *   GET /api/v1/books/{bookId}
 *
 * 返される BookDto には以下の情報が含まれます:
 *   - id: 書籍 ID
 *   - name: ファイル名（例: "vol1.cbz"）
 *   - seriesId: 親シリーズの ID
 *   - metadata: {
 *       title: 書籍タイトル（表示用）
 *       number: 巻数・話数など
 *       summary: 書籍の説明文
 *       ...その他のメタデータ
 *     }
 *
 * @param {string} bookId - 書籍情報を取得したい書籍の ID
 * @returns {Promise<any>} BookDto オブジェクトを返す Promise
 */
export async function fetchBook(bookId: string) {
  const res = await fetch(`/api/v1/books/${bookId}`, {
    credentials: "include",
  });
  return res.json();
}


/**
 * Komga のページ画像 URL を生成する
 *
 * @param bookId 本の ID
 * @param pageNumber 0-based のページ番号
 */
export function buildPageUrl(bookId: string, pageNumber: number): string {
  return `/api/v1/books/${bookId}/pages/${pageNumber}?zero_based=true`;
}
