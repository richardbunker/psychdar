import React from "react";

export default function DateInput(props) {
    return (
        <div>
            <input
                id={props.id}
                className={
                    "py-1 px-2 w-full rounded bg-white shadow text-gray-600 focus:outline-none " +
                    (props.validInput
                        ? ""
                        : "border-2 focus:border-red-400 border-red-400")
                }
                onChange={event => props.handleOnChange(event.target.value)}
                placeholder="dd/mm/yyyy"
                type="text"
                value={props.value}
            />
            <label
                className="font-semibold text-gray-400 text-xs"
                htmlFor={props.id}
            >
                {props.label}
            </label>
        </div>
    );
}
