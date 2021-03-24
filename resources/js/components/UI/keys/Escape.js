import React, { useEffect } from "react";

export default function EscapeKey(props) {
    useEffect(() => {
        const handleEsc = event => {
            if (event.keyCode === 27) {
                props.function();
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);
    return <></>;
}
