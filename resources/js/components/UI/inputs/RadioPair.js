import React from "react";

export default function RadioPair(props) {
    return (
        <div className="flex items-center justify-between space-x-3 text-gray-500 font-semibold">
            <label className="flex items-center justify-start w-24">
                <input
                    className="mr-1"
                    type="radio"
                    value={"1"}
                    onChange={e => props.handleChange(e)}
                    checked={props.status == "1"}
                />
                {props.truthyLabel}
            </label>
            <label className="flex items-center justify-start w-24">
                <input
                    className="mr-1"
                    type="radio"
                    value={"0"}
                    onChange={e => props.handleChange(e)}
                    checked={props.status == "0"}
                />
                {props.falseyLabel}
            </label>
        </div>
    );
}
