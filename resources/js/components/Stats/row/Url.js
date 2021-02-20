import React from "react";

export default function Url(props) {
    const size = props.iconSize;
    const colour = props.iconColour;
    return (
        <div className="flex items-center justify-between w-full">
            <svg
                className={"w-" + size + " " + "h-" + size + " " + colour}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                />
            </svg>
            <div className="text-gray-600 ml-3 flex items-center justify-between w-full">
                <div className=" w-full">{props.heading}</div>
                <a
                    href="http://127.0.0.1:8000/a/N1vDyr/xP0w18"
                    className="ml-2 text-right"
                    target="_blank"
                >
                    {props.link}
                </a>
            </div>
        </div>
    );
}
