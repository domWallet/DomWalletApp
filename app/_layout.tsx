import {Stack} from "expo-router";

export default function RootLayout() {

  return (
      <>
        <Stack initialRouteName={"(tabs)"}>
          <Stack.Screen name="index" options={{ headerShown:false}} />
          <Stack.Screen name="login" options={{ headerShown:false}} />
          <Stack.Screen name="choose" options={{ headerShown:false}} />
          <Stack.Screen name="(tabs)" options={{ headerShown:false }}/>
          <Stack.Screen name="splashPage/walletSkeleton" options={{ headerShown:false}} />
          <Stack.Screen name="wallet/import/importByMnemonic" options={{ headerShown:false}} />
          <Stack.Screen name="wallet/create/createHit" options={{ headerShown:false}} />
          <Stack.Screen name="wallet/create/generateMnemonic" options={{ headerShown:false}} />
          <Stack.Screen name="wallet/create/confirmMnemonic" options={{ headerShown:false}} />
          <Stack.Screen name="account/tokens" options={{ headerShown:false}} />
          <Stack.Screen name="account/receiveTokens" options={{ headerShown:false}} />
          <Stack.Screen name="account/selectToken" options={{ headerShown:false}} />
          <Stack.Screen name="account/transferToken" options={{ headerShown:false}} />
          <Stack.Screen name="account/transferSigend" options={{ headerShown:false}} />
          <Stack.Screen name="account/transferResult" options={{ headerShown:false}} />
          <Stack.Screen name="test" options={{ headerShown:false}} />
        </Stack>
      </>
  )
}
