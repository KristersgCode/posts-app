import { ScrollView, StyleSheet, Text } from "react-native";
import { type Post } from "../api/posts";
import { colors } from "../theme";

type PostDetailContentProps = {
  post: Post;
};

export function PostDetailContent({ post }: PostDetailContentProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.metadata}>ID: {post.id}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    gap: 16,
  },
  metadata: {
    color: colors.purple,
    fontSize: 14,
  },
  title: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  body: {
    color: colors.black,
    fontSize: 18,
    lineHeight: 28,
  },
});
