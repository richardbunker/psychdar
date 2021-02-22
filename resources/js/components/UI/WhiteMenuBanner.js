import React from "react";

export default function WhiteMenuBanner(props) {
    return (
        <div className="flex items-center justify-between w-full text-lg text-gray-400 h-10 px-2 bg-white uppercase">
            <div>{props.title}</div>
            {props.children}
        </div>
    );
}
