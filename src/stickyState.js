import React from 'react'

function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    }, [])

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useStickyState;
