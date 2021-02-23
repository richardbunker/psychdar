import React from "react";

export default function WhiteMenuBanner(props) {
    return (
        <div className="flex items-center justify-between w-full text-lg h-10 px-4 bg-white uppercase">
            <div className="text-gray-600">{props.title}</div>
            {props.children}
        </div>
    );
}
