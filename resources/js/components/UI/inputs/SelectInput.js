import React from "react";
import { truncateString } from "../../../utilities/HelperFunctions";

export default function SelectInput(props) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
            <div className="text-gray-600 font-semibold w-1/3">
                {props.title}
            </div>
            <select
                onChange={props.onSelect}
                defaultValue={props.defaultValue}
                className="py-1 px-2 rounded bg-white shadow text-gray-600 w-full"
            >
                <option value={props.defaultText} disabled={true}>
                    {props.defaultText}
                </option>
                {props.options.map(option => {
                    return (
                        <option key={option.value} value={option.value}>
                            {truncateString(option.title, 70)}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
