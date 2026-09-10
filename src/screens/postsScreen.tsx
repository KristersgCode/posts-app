import { FlatList, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { type Post } from "../api/posts";
import { ScrollButton } from "../components/scrollButton";
import { PostContainer } from "../components/postContainer";
import { PostsListState } from "../components/postsListState";
import { usePaginatedPosts } from "../hooks/usePaginatedPosts";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { colors } from "../theme";

export function PostsScreen() {
  const { posts, isLoading, error, loadMore, retry } = usePaginatedPosts();
  const { listRef, showScrollToTop, handleScroll, scrollToTop } =
    useScrollToTop<Post>();

  const listState = (
    <PostsListState
      isLoading={isLoading}
      error={error}
      isEmpty={posts.length === 0}
      onRetry={retry}
    />
  );

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.screen}>
      <StatusBar style="dark" />
      <FlatList
        ref={listRef}
        data={posts}
        keyExtractor={(post) => String(post.id)}
        renderItem={({ item }) => <PostContainer post={item} />}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListEmptyComponent={listState}
        ListFooterComponent={posts.length > 0 ? listState : null}
      />
      {showScrollToTop && <ScrollButton onPress={scrollToTop} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  list: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 88,
    gap: 16,
  },
});
