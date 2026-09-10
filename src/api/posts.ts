export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const PAGE_SIZE = 10;

export async function fetchPosts(page: number, signal?: AbortSignal) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`,
    { signal },
  );

  if (!response.ok) throw new Error("Failed to load posts");

  const posts: Post[] = await response.json();
  const totalHeader = response.headers.get("x-total-count");
  const total = totalHeader === null ? null : Number(totalHeader);

  return {
    posts,
    hasNextPage:
      total !== null && Number.isFinite(total)
        ? page * PAGE_SIZE < total
        : posts.length === PAGE_SIZE,
  };
}
