import React from "react";
import Checkbox from "./Checkbox";

export default function CheckboxInput(props) {
    return (
        <div className="flex items-start space-x-2 w-full">
            <div className="text-gray-600 font-semibold w-1/3">
                {props.title}
            </div>
            <div className="w-full flex flex-col items-start justify-start">
                <Checkbox
                    onCheckboxChange={bool => props.onCheckedInput(bool)}
                    label={props.label}
                    value={props.value}
                    disabled={false}
                    checked={props.value}
                />
                <label className="leading-normal max-w-sm py-2 text-gray-500 text-sm">
                    {props.text}
                </label>
            </div>
        </div>
    );
}
