import React from "react";

export default function ButtonBlueLarge(props) {
    return (
        <button
            onClick={props.handleClick}
            className="flex font-semibold bg-blue-400 items-center px-6 rounded text-xl text-white hover:bg-blue-500 min-w-max-content uppercase py-4 justify-center"
        >
            {props.label}
        </button>
    );
}
