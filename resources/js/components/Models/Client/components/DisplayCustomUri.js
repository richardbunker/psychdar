import React from "react";

export default function DisplayCustomUri(props) {
    return (
        <div className="flex items-center space-x-2 w-full">
            <div className="text-gray-600 font-semibold w-1/3">Custom URI</div>
            <div className="flex items-center justify-between w-full">
                <div className="text-gray-600 w-full italic">
                    {props.customClientUri}
                </div>
                <svg
                    onClick={() => props.trashCustomClientUri()}
                    className="w-6 h-6 text-gray-500 hover:text-gray-600 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </div>
        </div>
    );
}
