import { Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

type ScrollButtonProps = {
  onPress: () => void;
};

export function ScrollButton({ onPress }: ScrollButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.scrollToTop,
        { bottom: insets.bottom + 16, right: insets.right + 16 },
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.arrow}>↑</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollToTop: {
    opacity: 0.8,
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  arrow: {
    color: colors.black,
    fontSize: 28,
    fontWeight: "700",
  },
});
