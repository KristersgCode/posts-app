import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { validatePersonCode } from "../auth/personCode";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ErrorText } from "../components/ErrorText";
import { colors } from "../theme";

export function LoginScreen() {
  const [personCode, setPersonCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleLogin() {
    if (personCode.length === 0) return;

    const validationError = validatePersonCode(personCode);
    setError(validationError);
    if (validationError) {
      return;
    }

    Keyboard.dismiss();
    Alert.alert("Success", "Posts screen Not yet implemented");
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <Text style={styles.title}>Posts App</Text>
            <Text style={styles.description}>
              Ievadi savu personas kodu lai turpinātu
            </Text>
            <Input
              title="Personas kods"
              accessibilityHint="Six digits, a hyphen, then five digits."
              value={personCode}
              onChangeText={(value) => {
                setPersonCode(value);
                setError(null);
              }}
              onSubmitEditing={handleLogin}
              placeholder="DDMMYY-XXXXX"
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              returnKeyType="go"
            />
            {error && <ErrorText message={error} />}
            <Button
              title="Ienāc"
              onPress={handleLogin}
              disabled={personCode.length === 0}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.purple,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  form: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  title: {
    color: colors.white,
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
});
