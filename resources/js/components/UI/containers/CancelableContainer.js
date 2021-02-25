import React from "react";
import CircularCancelButton from "../buttons/CircularCancelButton";

export default function CancelableContainer(props) {
    return (
        <div className="bg-white border-2 border-gray-200 rounded">
            <div className="flex items-center justify-between p-2">
                <div className="text-lg text-gray-500">{props.heading}</div>
                <CircularCancelButton handleOnClick={props.toggleSelf} />
            </div>
            <div className="p-4">{props.children}</div>
        </div>
    );
}
