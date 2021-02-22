import React from "react";

export default function WhiteBanner(props) {
    return (
        <div className="w-full text-lg text-gray-400 px-2 h-10 flex items-center bg-white uppercase">
            {props.title}
        </div>
    );
}
