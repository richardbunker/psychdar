import React from "react";

export default function LinkGray(props) {
    return (
        <a
            className="flex bg-gray-400 items-center px-3 rounded hover:bg-gray-500 w-full py-2 space-x-2"
            href={props.url}
            target={props.shouldOpenInNewTab ? "_blank" : "_self"}
        >
            <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            <span className="uppercase font-semibold text-sm text-white">
                {props.label}
            </span>
        </a>
    );
}
