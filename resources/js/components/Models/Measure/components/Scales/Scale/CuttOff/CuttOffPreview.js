import React from "react";

export default function CuttOffPreview(props) {
    return (
        <div className="bg-gray-700 flex items-center justify-between px-2 py-1 rounded space-x-2 text-base w-full">
            <div className="flex space-x-2">
                <div className="text-green-400">"{props.label}"</div>
                <div className="text-blue-500">
                    <span>
                        {props.min}-{props.max}
                    </span>
                </div>
                <div className="text-yellow-200">
                    {props.alert ? "Email Alerts" : ""}
                </div>
            </div>
            <div className="space-x-1">
                <button
                    value={props.index}
                    onClick={() => props.editCuttOff(props.index)}
                    className="p-1"
                >
                    <svg
                        className="w-5 h-5 text-gray-400 hover:text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
                <button
                    value={props.index}
                    onClick={() => props.deleteCuttOff(props.index)}
                    className="p-1"
                >
                    <svg
                        className="w-5 h-5 text-gray-400 hover:text-gray-300"
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
                </button>
            </div>
        </div>
    );
}
