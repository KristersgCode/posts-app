import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import { colors } from "../theme";

type InputProps = TextInputProps & {
  title: string;
};

export function Input({ title, onFocus, onBlur, style, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text style={styles.label}>
        {title}
      </Text>
      <TextInput
        placeholderTextColor={colors.purple}
        selectionColor={colors.purple}
        {...props}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        style={[styles.input, style, isFocused && styles.inputFocused]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.white,
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
  },
  inputFocused: {
    borderColor: colors.yellow,
  },
});
