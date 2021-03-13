import React from "react";

export default function ErrorInput(props) {
    return (
        <div className="flex items-center space-x-2 w-full">
            <span className="w-full text-right font-semibold text-sm text-red-400">
                {props.error}
            </span>
        </div>
    );
}
