import { useRef, useState } from "react";
import {
  type FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

export function useScrollToTop<Item>(threshold = 300) {
  const listRef = useRef<FlatList<Item>>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  function handleScroll({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) {
    setShowScrollToTop(nativeEvent.contentOffset.y > threshold);
  }

  function scrollToTop() {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  return { listRef, showScrollToTop, handleScroll, scrollToTop };
}
