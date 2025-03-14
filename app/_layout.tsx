import {router, Stack} from "expo-router";
import Routes from "@/constant/routes";
import {useEffect} from "react";
import {getPhrase, getPrivateKey, getPrivateKeyIndexBound} from "@/utils/useStorageState";
import tronService from "@/services/TronService";
import useAccountStore from "@/store/accountStore";

export default function RootLayout() {

  const accountStore = useAccountStore()

  return (
      <>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown:false}} />
          <Stack.Screen name="choose" options={{ headerShown:false}} />
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
          <Stack.Screen name="(tabs)" options={{ headerShown:false }}/>
          <Stack.Screen name="test" options={{ headerShown:false}} />
        </Stack>
      </>
  )
}
