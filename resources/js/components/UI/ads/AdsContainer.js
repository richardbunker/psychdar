import React from "react";

export default function AdsContainer(props) {
    return (
        <div className="bg-gray-200 border font-semibold mb-2 p-4 rounded text-center text-gray-400 uppercase">
            {props.children}
        </div>
    );
}
