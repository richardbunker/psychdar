import React from "react";

export default function SelectInput(props) {
    return (
        <div className="flex items-center space-x-2 w-full">
            <div className="text-gray-600 font-semibold w-1/3">
                {props.title}
            </div>
            <select
                onChange={props.onSelect}
                defaultValue={props.defaultValue}
                className="py-1 px-2 rounded bg-white shadow text-gray-600 w-full font-semibold"
            >
                <option value={props.defaultText} disabled={true}>
                    {props.defaultText}
                </option>
                {props.options.map(option => {
                    return <option key={option}>{option}</option>;
                })}
            </select>
        </div>
    );
}
