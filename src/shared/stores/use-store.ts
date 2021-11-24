// Coded by Dennis Wolters (https://github.com/DennisTennis)
import { useLocalStore } from ".";
import { useEffect } from "react";

export type StoreInitializer<TStore> = () => TStore;

export const useStore = <TStore>(store: StoreInitializer<TStore>): TStore => {
  const localStore = useLocalStore(() => store());
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
