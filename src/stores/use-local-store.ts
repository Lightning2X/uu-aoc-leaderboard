// Coded by Dennis Wolters (https://github.com/DennisTennis)
import { useEffect } from "react";
import { useLocalStore } from ".";

export const useLocalStoreWithInitializer = <TStore>(
  store: () => TStore
): TStore => {
  const localStore = useLocalStore(store);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyStore = localStore as any;

  useEffect(() => {
    if (anyStore.onInitialize) {
      const initializer = async () => await anyStore.onInitialize();
      initializer();
    }

    return anyStore.onUnmount;
  }, [anyStore]);

  return localStore;
};
