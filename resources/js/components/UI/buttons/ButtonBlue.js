import React from "react";

export default function ButtonBlue(props) {
    return (
        <button
            onClick={props.handleClick}
            className="flex font-semibold bg-blue-400 items-center px-3 rounded text-sm text-white hover:bg-blue-500 w-full uppercase py-2 justify-center"
        >
            {props.label}
        </button>
    );
}
