import React from "react";

export default function ToggleButton(props) {
    const handleClick = () => {
        props.onHandleClick();
    };
    return (
        <button
            onClick={handleClick}
            className="bg-blue-400 hover:bg-blue-500 hover:shadow px-2 py-1 rounded text-white text-sm uppercase font-semibold"
        >
            {props.text}
        </button>
    );
}
