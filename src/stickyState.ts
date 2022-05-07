import React, {Dispatch, SetStateAction} from 'react'

function useStickyState(defaultValue: any, key: string) : [any, Dispatch<SetStateAction<any>>] {
    const [value, setValue] = React.useState<any>(defaultValue);

    React.useEffect(() => {
        const stickyValue = localStorage.getItem(key);
        setValue(stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue);
    }, [])

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}

export default useStickyState;
