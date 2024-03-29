import React, { useState } from "react";

export default function QuestionMark(props) {
    const [showInfoBox, setShowInfoBox] = useState(false);

    const toggleInfoBox = () => {
        setShowInfoBox(prevState => !prevState);
    };
    return (
        <span
            onClick={() => toggleInfoBox()}
            className="relative cursor-pointer"
        >
            {showInfoBox ? (
                <div
                    className={
                        "absolute bg-white border-2 border-orange-300 p-4 rounded shadow-lg text-base text-gray-500 z-10" +
                        props.position
                    }
                >
                    <div className="text-sm font-medium w-full leading-normal">
                        {props.text}
                    </div>
                </div>
            ) : (
                ""
            )}
            <span>
                <svg
                    className={
                        "w-" +
                        (props.size - 2) +
                        " " +
                        "h-" +
                        (props.size - 2) +
                        " " +
                        "text-gray-400"
                    }
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
        </span>
    );
}
