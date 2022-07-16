import React, {Dispatch, SetStateAction, useEffect} from 'react'

export default function useStickyState<S>(defaultValue: S, key: string): [S, Dispatch<SetStateAction<S>>] {
    const [value, setValue] = React.useState<S>(defaultValue);

    useEffect(() => {
        const stickyValue = localStorage.getItem(key);
        setValue(stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue);
    }, [])

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}

export function ifClientSide<S>(call: () => S): S | undefined {
    if (typeof localStorage !== 'undefined') {
        return call();
    }
}
