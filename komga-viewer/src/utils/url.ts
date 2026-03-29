/**
 * URL パスから bookId を抽出する。
 * 例: "/book/ABC123/read" → "ABC123"
 *
 * @param path URL のパス部分（location.pathname）
 * @returns bookId（見つからない場合は undefined）
 */
export function getBookId(path: string): string | undefined  {
  const match = path.match(/^\/book\/([^/]+)\/read/);
  return match?.[1];
}
