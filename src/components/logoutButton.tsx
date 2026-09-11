import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

import { useSession } from "../auth/sessionProvider";
import { colors } from "../theme";

export function LogoutButton() {
  const { signOut } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch {
      Alert.alert("Neizdevās iziet", "Lūdzu, mēģiniet vēlreiz.");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <Pressable
      disabled={isSigningOut}
      onPress={handleLogout}
      style={({ pressed }) => [
        styles.logoutButton,
        (pressed || isSigningOut) && styles.logoutButtonDisabled,
      ]}
    >
      <Text style={styles.logoutText}>Iziet</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  logoutButtonDisabled: {
    opacity: 0.5,
  },
  logoutText: {
    color: colors.purple,
    fontSize: 16,
    fontWeight: "600",
  },
});
