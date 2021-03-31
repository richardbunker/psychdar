import React from "react";

export default function ButtonBlue(props) {
    return (
        <button
            onClick={props.handleClick}
            className="flex font-semibold bg-blue-400 items-center px-3 rounded text-xs sm:text-sm text-white hover:bg-blue-500 min-w-max-content uppercase py-2 space-x-2"
        >
            {props.children}
            {props.label}
        </button>
    );
}
