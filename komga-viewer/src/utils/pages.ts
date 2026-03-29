import { buildPageUrl } from "@/api/komga";

const BLACK_IMAGE =
  // 1x1px png
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AARwMBgQAAAABJRU5ErkJggg==";
  // 2x2px jpeg
  // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcICQoKCgoKCg0NDQ0NDQ0NDQ0NDQ0NDQ3/2wCEAQICAgQDAwQDAw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ3/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCfAAH/2Q==";

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

/**
 * PageFlipBook の currentPage（0〜N-1）を
 * 実際の表示ページ番号（1〜totalPages）に変換する
 *
 * @param currentPage PageFlipBook の現在ページ
 * @param totalPages 黒ページを除いた総ページ数
 */
export function convertToDisplayPage(currentPage: number, totalPages: number): number {
  return Math.max(1, totalPages - currentPage);
}

export function convertToOriginalPage(displayPage: number, totalPages: number): number {
  if(displayPage === 1) {
    return totalPages;
  }
  return totalPages - displayPage;
}
