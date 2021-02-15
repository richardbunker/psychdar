import React from "react";

export default function Checkbox(props) {
    return (
        <div className="flex items-center text-gray-500 space-x-2">
            <input
                disabled={props.disabled}
                onChange={e => props.onCheckboxChange(e.target.value)}
                type="checkbox"
                value={props.value}
                checked={props.checked}
            />
            <div className={props.disabled ? "line-through text-gray-400" : ""}>
                {props.label}
            </div>
        </div>
    );
}
