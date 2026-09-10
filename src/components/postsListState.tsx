import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";
import { colors } from "../theme";

type PostsListStateProps = {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  onRetry: () => void;
};

export function PostsListState({
  isLoading,
  error,
  isEmpty,
  onRetry,
}: PostsListStateProps) {
  if (isLoading) {
    return (
      <View style={styles.state}>
        <ActivityIndicator color={colors.purple} size="large" />
        <Text style={styles.message}>Ielādē ierakstus…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.state}>
        <Text style={styles.message}>{error}</Text>
        <Button title="Mēģināt vēlreiz" onPress={onRetry} />
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.state}>
        <Text style={styles.message}>Nav ierakstu</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  state: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  message: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
