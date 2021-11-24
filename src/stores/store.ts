// Coded by Dennis Wolters (https://github.com/DennisTennis)
import { toJS, observable } from 'mobx'
import { observer, useLocalObservable } from 'mobx-react-lite'

export const asGlobalStore = <TStore extends object>(storeFactory: TStore) => {
    const store = observable<TStore>(storeFactory)
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyStore = store as any
    if (anyStore.onInitialize) {
        setTimeout(async() => await anyStore.onInitialize())
    }

    return store
}
export const withObserver = observer
export const useLocalStore = useLocalObservable
export const proxyToJs = toJS