import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "posts-app:session";

export async function restoreSession(): Promise<boolean> {
  return (await AsyncStorage.getItem(SESSION_KEY)) === "authenticated";
}

export async function saveSession(): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, "authenticated");
}

//delete session for debugging purposes
export async function deleteSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}
