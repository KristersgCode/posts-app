import { useState } from "react";
import {
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
import { useSession } from "../auth/sessionProvider";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { ErrorText } from "../components/errorText";
import { colors } from "../theme";

export function LoginScreen() {
  const { signIn } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [personCode, setPersonCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const canSubmit = personCode.length === 0 || isSubmitting;

  async function handleLogin() {
    if (canSubmit) return;

    const validationError = validatePersonCode(personCode);
    setError(validationError);
    if (validationError) {
      return;
    }

    setIsSubmitting(true);
    try {
      Keyboard.dismiss();
      await signIn();
    } catch {
      setError("Neizdevās izveidot sesiju. Lūdzu mēģiniet vēlreiz.");
    } finally {
      setIsSubmitting(false);
    }
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
              Lai turpinātu, ievadi savu personas kodu.
            </Text>
            <Input
              title="Personas kods"
              value={personCode}
              editable={!isSubmitting}
              onChangeText={(value) => {
                setPersonCode(value);
                setError(null);
              }}
              onSubmitEditing={handleLogin}
              placeholder="123456-12345"
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              returnKeyType="go"
            />
            {error && <ErrorText message={error} />}
            <Button title="Ienāc" onPress={handleLogin} disabled={canSubmit} />
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
