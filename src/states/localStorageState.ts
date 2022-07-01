import React, {Dispatch, SetStateAction, useEffect} from 'react'

export default function useStickyState(defaultValue: any, key: string) : [any, Dispatch<SetStateAction<any>>] {
    const [value, setValue] = React.useState<any>(defaultValue);

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

export function ifClientSide(call: () => any) {
    if (typeof localStorage !== 'undefined') {
        return call();
    }
}
