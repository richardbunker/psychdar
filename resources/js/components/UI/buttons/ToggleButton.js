import React from "react";

export default function ToggleButton(props) {
    const handleClick = () => {
        props.onHandleClick();
    };
    return (
        <button
            onClick={handleClick}
            className="bg-green-200 hover:bg-green-100 hover:shadow px-2 py-1 rounded text-gray-500 text-sm"
        >
            {props.text}
        </button>
    );
}
