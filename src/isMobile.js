import React, {useEffect, useState} from "react";

function IsMobile () {
    const [width, setWidth] = useState(1024);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        handleWindowSizeChange();

        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return width < 1024;
}

export default IsMobile;