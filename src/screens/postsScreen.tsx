import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";
import { deleteSession } from "../auth/session";

export function PostsScreen() {
  // function for dev purposes to delete local storage session
  // deleteSession();
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.screen} />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.purple },
});
