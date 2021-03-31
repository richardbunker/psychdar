import React from "react";

export default function ButtonGray(props) {
    return (
        <button
            onClick={props.handleClick}
            className="flex font-semibold bg-gray-400 items-center px-3 rounded text-xs sm:text-sm text-white hover:bg-gray-500 min-w-max-content uppercase py-2 justify-center"
        >
            {props.label}
        </button>
    );
}
