import { Stack } from "expo-router";
import Routes from "@/constant/routes";

export default function RootLayout() {
  return (
      <>
        <Stack>
          <Stack.Screen name="test" options={{ headerShown:false}} />
          <Stack.Screen name="index" options={{ headerShown:false}} />
          <Stack.Screen name="wallet/import/importByMnemonic" options={{ headerShown:false}} />
          <Stack.Screen name="wallet/create/createHit" options={{ headerShown:false}} />
          <Stack.Screen name="wallet/create/generateMnemonic" options={{ headerShown:false}} />
        </Stack>
      </>
  )
}
