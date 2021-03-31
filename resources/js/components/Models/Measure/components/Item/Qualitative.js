import React from "react";

export default function Qualitative(props) {
    return (
        <div className="leading-normal text-base sm:text-xl space-y-1">
            <div className="font-semibold flex items-center space-x-2 text-gray-600">
                {props.item.title}
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
                {props.item.subtitle}
            </div>
            <textarea
                onChange={e => props.handleOnChange(e.target.value)}
                placeholder="Enter your response here..."
                className="px-2 py-1 rounded border text-gray-600 w-full"
                rows="3"
            ></textarea>
        </div>
    );
}
