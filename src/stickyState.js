import React from 'react'

function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(defaultValue);

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
