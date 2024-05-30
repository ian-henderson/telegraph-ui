import { useCallback, useEffect, useMemo, useState } from "react";

export default function useLocalStorage<T = string>(
    localStorageKey: string,
): [T | undefined, { removeValue: () => void; setValue: (value: T) => void }] {
    const memoizedLocalStorageValue = useMemo(
        () => getValueFromLocalStorage(localStorageKey),
        [localStorageKey],
    );

    const [valueState, setValueState] = useState(memoizedLocalStorageValue);

    useEffect(() => {
        setValueState(memoizedLocalStorageValue);
    }, [memoizedLocalStorageValue, setValueState]);

    useEffect(() => {
        const updateState = () =>
            setValueState(getValueFromLocalStorage(localStorageKey));
        addEventListener("storage", updateState);
        return () => removeEventListener("storage", updateState);
    }, [localStorageKey, setValueState]);

    const removeValue = useCallback(() => {
        localStorage.removeItem(localStorageKey);
        window.dispatchEvent(new Event("storage"));
    }, [localStorageKey]);

    const setValue = useCallback(
        (v: T) => {
            try {
                const value = typeof v === "string" ? v : JSON.stringify(v);
                localStorage.setItem(localStorageKey, value);
                window.dispatchEvent(new Event("storage"));
            } catch {
                return undefined;
            }
        },
        [localStorageKey],
    );

    return [valueState as T | undefined, { removeValue, setValue }];
}

function getValueFromLocalStorage(localStorageKey: string) {
    try {
        const item = localStorage.getItem(localStorageKey);

        if (item === null) return undefined;

        return item;
    } catch {
        return undefined;
    }
}
