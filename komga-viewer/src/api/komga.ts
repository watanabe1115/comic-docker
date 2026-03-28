export async function fetchPages(bookId: string) {
  const res = await fetch(`/api/v1/books/${bookId}/pages`, {
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
