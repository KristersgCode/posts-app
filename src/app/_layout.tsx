import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "../theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.purple },
          headerTintColor: colors.white,
          contentStyle: { backgroundColor: colors.purple },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
