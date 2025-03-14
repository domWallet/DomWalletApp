import { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import {
  generateKeyAndEncryptData,
  decryptDataWithKey,
  EncryptedData,
} from "../utils/cryptoUtils";

export async function removePhrase(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync("phrase");
  } catch (error) {
    console.error("Failed to remove the phrase securely.", error);
  }
}

// 存储助记词
export async function savePhrase(phrase: string): Promise<void> {
  try {
    const encryptedData = await generateKeyAndEncryptData(phrase);
    await SecureStore.setItemAsync("phrase", JSON.stringify(encryptedData));
    // @ts-ignore
    await SecureStore.setItemAsync("phraseKey", encryptedData.key);
  } catch (error) {
    console.error("Failed to save the phrase securely.", error);
  }
}

// 存储私钥
export async function savePrivateKey(privateKey: string, index: number): Promise<void> {
  try {
    const encryptedData = await generateKeyAndEncryptData(privateKey);
    await SecureStore.setItemAsync("privateKey_" + index, JSON.stringify(encryptedData));
    // @ts-ignore
    await SecureStore.setItemAsync("privateKeyKey_" + index, encryptedData.key);
  }catch (error){
    console.error("Failed to save the private key securely.", error);
  }
}

// 存储私钥索引上界
export async function savePrivateKeyIndexBound(index: number): Promise<void> {
  try {
    const temp_index = index + 1
    await SecureStore.setItemAsync("privateKeyIndexBound", JSON.stringify(temp_index));
  }catch (error) {
    console.error("Failed to save the privateKey index.", error)
  }
}

// 存储token
export async function saveAccessToken(token: string): Promise<void> {
  try {
    const encryptedData = await generateKeyAndEncryptData(token);
    await SecureStore.setItemAsync("token", JSON.stringify(encryptedData));
    // @ts-ignore
    await SecureStore.setItemAsync("tokenKey", encryptedData.key);
  }catch (error) {
    console.error("Failed to save the Access Token.", error);
  }
}

// 获取助记词
export async function getPhrase(): Promise<string | null> {
  try {
    const encryptedDataString = await SecureStore.getItemAsync("phrase");
    const key = await SecureStore.getItemAsync("phraseKey");

    if (encryptedDataString && key) {
      const encryptedData: EncryptedData = JSON.parse(encryptedDataString);
      const phrase = await decryptDataWithKey(encryptedData, key);
      return phrase;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to retrieve the phrase.", error);
    return null;
  }
}

// 获取私钥
export async function getPrivateKey(index: number): Promise<string | null> {
  try {
    const encryptedDataString = await SecureStore.getItemAsync("privateKey_" + index);
    const key = await SecureStore.getItemAsync("privateKeyKey_" + index);

    if (encryptedDataString && key) {
      const encryptedData: EncryptedData = JSON.parse(encryptedDataString);
      const privateKey = await decryptDataWithKey(encryptedData, key);
      return privateKey;
    }else {
      return null;
    }
  }catch (error) {
    console.error("Failed to retrieve the private key.", error);
    return null;
  }
}

// 获取私钥索引上界
export async function getPrivateKeyIndexBound(): Promise<number | null> {
  try {
    const indexBound = await SecureStore.getItemAsync("privateKeyIndexBound");
    if (indexBound) {
      return parseInt(indexBound);
    }else {
      return 0;
    }
  }catch (error) {
    console.error("Failed to retrieve the privateKeyIndexBound.", error)
    return null;
  }
}

// 获取Access Token
export async function getAccessToken(): Promise<string | null> {
  try {
    const encryptedDataString = await SecureStore.getItemAsync("token");
    const key = await SecureStore.getItemAsync("tokenKey");
    if (encryptedDataString && key) {
      const encryptedData: EncryptedData = JSON.parse(encryptedDataString);
      const token = await decryptDataWithKey(encryptedData, key);
      return token;
    }else {
      return null;
    }
  }catch (error) {
    console.error("Failed to retrieve the token.", error);
    return null;
  }
}


export async function clearStorage(): Promise<void> {
  if (Platform.OS === "web") {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    await SecureStore.deleteItemAsync("address");
    await SecureStore.deleteItemAsync("phrase");
    await SecureStore.deleteItemAsync("publicKey");
    await SecureStore.deleteItemAsync("privateKey");
    await SecureStore.deleteItemAsync("phraseKey");
  }
}

export async function phraseExists(): Promise<boolean> {
  const phrase = await SecureStore.getItemAsync("phrase");
  return phrase !== null;
}

type StorageValue = string | null;

export function useStorage(
  key: string
): [StorageValue, (value: string | null) => Promise<void>, boolean] {
  const [storageValue, setStorageValue] = useState<StorageValue>(null);
  const [loading, setLoading] = useState(true);

  const getStorageValue = useCallback(async () => {
    try {
      const value = await SecureStore.getItemAsync(key);
      setStorageValue(value ? JSON.parse(value) : null);
    } catch (error) {
      console.error(`Failed to get storage value for key "${key}":`, error);
      setStorageValue(null);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    getStorageValue();
  }, [getStorageValue]);

  const setStorageItem = useCallback(
    async (value: string | null) => {
      try {
        if (value === null) {
          await SecureStore.deleteItemAsync(key);
        } else {
          await SecureStore.setItemAsync(key, JSON.stringify(value));
        }
        setStorageValue(value);
      } catch (error) {
        console.error(`Failed to set storage value for key "${key}":`, error);
      }
    },
    [key]
  );

  return [storageValue, setStorageItem, loading];
}
