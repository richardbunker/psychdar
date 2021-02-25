import React from "react";

export default function GrayFadedMenuBanner(props) {
    return (
        <div className="flex items-center justify-between w-full text-lg font-bold text-white h-10 px-2 bg-gradient-to-r from-gray-400 to-gray-300 uppercase">
            <div>{props.title}</div>
            <div>{props.children}</div>
        </div>
    );
}
