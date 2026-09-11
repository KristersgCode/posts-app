import { type Post } from "./posts";

export async function fetchPost(
  id: string,
  signal?: AbortSignal,
): Promise<Post | null> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { signal },
  );

  if (response.status === 404 || response.status === 204) {
    return null;
  }
  if (!response.ok) throw new Error("Failed to load post");

  const post: Post | null = await response.json();
  return post?.id ? post : null;
}
