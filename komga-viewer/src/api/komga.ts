export async function fetchPages(bookId: string) {
  const res = await fetch(`/api/v1/books/${bookId}/pages`, {
    credentials: "include",
  });
  return res.json();
}
