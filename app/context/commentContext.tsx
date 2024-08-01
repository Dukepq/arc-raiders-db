"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ItemComment } from "../types/commentTypes";
import { fetchItemComments } from "../lib/data/api";
import { commentsConfig } from "../config/constants";
import { useParams, usePathname } from "next/navigation";
import { createItemCommentAction } from "../server/actions";

type CommentContextType = {
  comments: ItemComment[];
  setComments: Dispatch<SetStateAction<ItemComment[]>>;
  loading: boolean;
  allCommentsLoaded: boolean;
  loadComments: () => Promise<void>;
};
const commentContext = createContext<CommentContextType | null>(null);

export function CommentContextProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: ItemComment[];
}) {
  const params = useParams();
  const itemId = params.item as string;
  const [comments, setComments] = useState<ItemComment[]>(initialState ?? []);

  const [allCommentsLoaded, setAllCommentsLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const hasFetched = useRef(false);

  const loadComments = useCallback(async () => {
    setLoading(true);
    const data = await fetchItemComments(itemId, {
      offset: comments.length.toString(),
      limit: commentsConfig.loadAmount.toString(),
    });
    if (!data) return;
    const { comments: newComments, commentsCount } = data;
    setAllCommentsLoaded(
      comments.length + newComments.length === commentsCount
    );
    setComments((prev) => prev.concat(newComments));
    setLoading(false);
  }, [comments.length]);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      (async () => {
        await loadComments();
      })();
    }
  }, []);

  return (
    <commentContext.Provider
      value={{
        comments,
        setComments,
        allCommentsLoaded,
        loading,
        loadComments,
      }}
    >
      {children}
    </commentContext.Provider>
  );
}

export function useCommentContext() {
  const ctx = useContext(commentContext);
  if (!ctx) {
    throw new Error("Context can only be used inside of a provider");
  }
  return ctx;
}
