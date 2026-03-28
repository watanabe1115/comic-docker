import { buildPageUrl } from "@/api/komga";

const BLACK_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AARwMBgQAAAABJRU5ErkJggg==";

/**
 * Komga のページ JSON から FlipBook 用のページ URL 配列を生成する
 */
export function buildPageList(bookId: string, json: any[]): string[] {
  const urls = json.map((p) => buildPageUrl(bookId, p.number - 1));

  urls.unshift(BLACK_IMAGE);
  urls.push(BLACK_IMAGE);
  urls.reverse();

  return urls;
}
