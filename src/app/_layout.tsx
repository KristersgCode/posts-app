import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { SessionProvider, useSession } from "../auth/sessionProvider";
import { colors } from "../theme";

export default function RootLayout() {
  return (
    <SessionProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          color={colors.yellow}
          accessibilityLabel="Loading session"
        />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.purple },
        headerTintColor: colors.white,
        contentStyle: { backgroundColor: colors.purple },
      }}
    >
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="posts"
          options={{
            title: "Ieraksti",
            headerStyle: { backgroundColor: colors.white },
            headerTintColor: colors.black,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="posts/[id]"
          options={{
            title: "Ieraksts",
            headerStyle: { backgroundColor: colors.white },
            headerTintColor: colors.black,
            headerShadowVisible: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
  },
});
