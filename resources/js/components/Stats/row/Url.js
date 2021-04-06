import React from "react";
import { truncateString } from "../../../utilities/HelperFunctions";

export default function Url(props) {
    const size = props.iconSize;
    const colour = props.iconColour;
    return (
        <div className="flex flex-col sm:flex-row items-start justify-between w-full text-gray-500 text-sm sm:text-base leading-normal">
            <div className="flex items-center space-x-2">
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
                <div className="">{truncateString(props.heading, 35)}</div>
            </div>
            <div className="flex flex-col sm:items-end space-y-2 sm:space-y-1 py-1">
                {props.displayCustomLink && (
                    <a
                        href={props.customLink}
                        className="text-green-500 hover:text-green-600 hover:underline"
                        target="_blank"
                    >
                        {props.customLink}
                    </a>
                )}
                <a
                    href={props.link}
                    className="text-blue-500 hover:text-blue-600 hover:underline"
                    target="_blank"
                >
                    {props.link}
                </a>
            </div>
        </div>
    );
}
