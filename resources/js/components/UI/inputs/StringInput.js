import React, { useEffect, useRef } from "react";

export default function StringInput(props) {
    const stringRef = useRef(null);

    useEffect(() => {
        props.shouldInputBeFocused && stringRef.current.focus();
    }, [props.value]);

    return (
        <div className="flex items-center space-x-2 w-full">
            <div className="text-gray-600 font-semibold w-1/3">
                {props.title}
            </div>
            <input
                ref={stringRef}
                value={props.value}
                onChange={e => props.handleOnStringChange(e)}
                name={props.name}
                type="text"
                className="py-1 px-2 rounded bg-white shadow text-gray-600 w-full"
                placeholder={props.placeholder}
                required
            />
        </div>
    );
}
