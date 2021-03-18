import React from "react";

export default function ButtonTeal(props) {
    return (
        <button
            onClick={props.handleClick}
            className="flex font-semibold bg-teal-400 items-center px-3 rounded text-sm text-white hover:bg-teal-500 min-w-max-content uppercase py-2 justify-center"
        >
            {props.label}
        </button>
    );
}
