import React from "react";

export default function StringCounter(props) {
    return (
        <div className="flex items-center space-x-2 w-full">
            <span className="w-1/3"></span>
            <span className="flex font-semibold items-center justify-end py-1 text-base w-full">
                <span
                    className={props.isValid ? "text-teal-400" : "text-red-400"}
                >
                    {props.number + "/" + props.max}
                </span>
            </span>
        </div>
    );
}
