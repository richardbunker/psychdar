import React from "react";

export default function ErrorInput(props) {
    return (
        <div className="flex items-center space-x-2 w-full">
            <span className="w-1/3"></span>
            <span className="w-full text-right font-semibold py-1 text-base text-red-400">
                {props.error}
            </span>
        </div>
    );
}
