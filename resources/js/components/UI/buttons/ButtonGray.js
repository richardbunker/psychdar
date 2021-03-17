import React from "react";

export default function ButtonGray(props) {
    return (
        <button
            onClick={props.handleClick}
            className="flex font-semibold bg-gray-400 items-center px-3 rounded text-sm text-white hover:bg-gray-500 w-full uppercase py-2 justify-center"
        >
            {props.label}
        </button>
    );
}
