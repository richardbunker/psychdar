import React from "react";

export default function GrayFadedBanner(props) {
    return (
        <div className="w-full text-sm sm:text-lg font-bold text-white px-2 h-10 flex items-center bg-gradient-to-r from-gray-400 to-gray-300 uppercase">
            {props.title}
        </div>
    );
}
