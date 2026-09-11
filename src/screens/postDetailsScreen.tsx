import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AsyncContentState } from "../components/asyncContentState";
import { PostDetailContent } from "../components/postDetailContent";
import { usePost } from "../hooks/usePost";
import { colors } from "../theme";

export function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { post, isLoading, error, retry } = usePost(id);

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.screen}>
      <StatusBar style="dark" />
      {isLoading || error || !post ? (
        <AsyncContentState
          isLoading={isLoading}
          error={error}
          isEmpty={!post}
          onRetry={retry}
          loadingMessage="Ielādē ierakstu…"
          emptyMessage="Ieraksts nav atrasts."
        />
      ) : (
        <PostDetailContent post={post} />
      )}
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
});
