import React from "react";

export default function TextInput(props) {
    return (
        <div className="flex items-start space-x-2 w-full">
            <div className="text-gray-600 font-semibold w-1/3">
                {props.title}
            </div>
            <textarea
                value={props.value}
                onChange={e => props.handleOnTextChange(e)}
                placeholder={props.placeholder}
                className="font-semibold p-2 rounded shadow text-gray-600 w-full"
                rows="5"
            ></textarea>
        </div>
    );
}
