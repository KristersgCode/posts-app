import { StyleSheet, Text } from "react-native";
import { colors } from "../theme";

type ErrorTextProps = {
  message: string;
};

export function ErrorText({ message }: ErrorTextProps) {
  return (
    <Text style={styles.error}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.yellow,
    fontSize: 14,
    marginTop: 10,
  },
});
