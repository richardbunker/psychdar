import React from "react";
import CircularCancelButton from "../buttons/CircularCancelButton";

export default function CancelableContainer(props) {
    return (
        <div className="bg-white rounded shadow">
            <div className="flex items-center justify-between p-2">
                <div className="text-xl text-gray-700 font-bold">
                    {props.heading}
                </div>
                <CircularCancelButton handleOnClick={props.toggleSelf} />
            </div>
            <div className="p-4">{props.children}</div>
        </div>
    );
}
