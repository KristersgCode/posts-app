import { Pressable, StyleSheet, Text } from "react-native";

import { type Post } from "../api/posts";
import { colors } from "../theme";

type PostContainerProps = {
  post: Post;
  onPress?: () => void;
};

export function PostContainer({ post, onPress }: PostContainerProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Text style={styles.id}>ID: {post.id}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.preview} numberOfLines={3}>
        {post.body.replace(/\s+/g, " ")}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 16,
    gap: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.8,
  },
  id: {
    color: colors.purple,
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  preview: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 22,
  },
});
