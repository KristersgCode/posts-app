import { useEffect, useRef, useState } from "react";
import { fetchPosts, type Post } from "../api/posts";

const postsErrorMessage =
  "Neizdevās ielādēt ierakstus. Lūdzu mēģiniet vēlreiz.";

export function usePaginatedPosts() {
  const activeRequest = useRef<AbortController | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  async function loadPosts(nextPage: number) {
    if (activeRequest.current) {
      return;
    }

    const controller = new AbortController();
    activeRequest.current = controller;

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchPosts(nextPage, controller.signal);

      if (controller.signal.aborted) {
        return;
      }

      setPosts((previous) =>
        nextPage === 1 ? result.posts : [...previous, ...result.posts],
      );

      setPage(nextPage);
      setHasNextPage(result.hasNextPage);
    } catch {
      if (!controller.signal.aborted) {
        setError(postsErrorMessage);
      }
    } finally {
      if (activeRequest.current === controller) {
        activeRequest.current = null;
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    void loadPosts(1);
    return () => {
      activeRequest.current?.abort();
      activeRequest.current = null;
    };
  }, []);

  function loadMore() {
    if (error || !hasNextPage) {
      return;
    }
    void loadPosts(page + 1);
  }

  function retry() {
    void loadPosts(page + 1);
  }

  return { posts, isLoading, error, loadMore, retry };
}
