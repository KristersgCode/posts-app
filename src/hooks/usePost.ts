import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPost } from "../api/post";
import { type Post } from "../api/posts";

export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const activeRequest = useRef<AbortController | null>(null);

  const loadPost = useCallback(
    async function loadPost() {
      if (activeRequest.current) {
        return;
      }
      const controller = new AbortController();
      activeRequest.current = controller;
      setIsLoading(true);
      setError(null);
      setPost(null);

      try {
        const isValidId = /^\d+$/.test(id);

        const result = isValidId
          ? await fetchPost(id, controller.signal)
          : null;
        if (!controller.signal.aborted) {
          setPost(result);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Neizdevās ielādēt ierakstu. Lūdzu, mēģiniet vēlreiz.");
        }
      } finally {
        if (activeRequest.current === controller) {
          activeRequest.current = null;
          setIsLoading(false);
        }
      }
    },
    [id],
  );

  useEffect(() => {
    void loadPost();
    return () => {
      activeRequest.current?.abort();
      activeRequest.current = null;
    };
  }, [loadPost]);

  return { post, isLoading, error, retry: loadPost };
}
