import React from "react";

export default function Text(props) {
    return (
        <div className="leading-normal text-base sm:text-xl space-y-1">
            <div className="font-semibold flex items-center space-x-2 text-gray-600">
                {props.item.title}
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
                {props.item.subtitle}
            </div>
        </div>
    );
}
