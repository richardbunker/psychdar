import React from "react";

export default function TealButton(props) {
    const handleClick = () => {
        props.onHandleClick();
    };
    return (
        <button
            onClick={handleClick}
            className="bg-teal-400 hover:bg-teal-500 text-sm text-white font-semibold uppercase py-1 px-2 rounded"
        >
            {props.text}
        </button>
    );
}
