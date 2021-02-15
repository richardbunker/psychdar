import React from "react";

export default function NumberInput(props) {
    const updateNumber = input => {
        props.handleOnNumberChange(Number(input));
    };

    return (
        <div className="flex items-center space-x-2 w-full">
            <div className="text-gray-600 font-semibold w-1/3">
                {props.title}
            </div>
            <input
                value={props.value}
                type="number"
                onChange={e => updateNumber(e.target.value)}
                className="py-1 px-2 rounded bg-gray-50 shadow text-gray-600 w-full font-semibold"
                placeholder={props.placeholder}
                required
            />
        </div>
    );
}
