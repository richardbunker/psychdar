import React, { useEffect } from "react";
import "./Slider.css";

export default function Slider(props) {
    const [left, right] = props.item.anchors;

    useEffect(() => {
        props.handleOnChange(Math.round(right.value / 2));
    }, []);
    return (
        <div className="leading-normal text-xl">
            <div className="font-semibold flex items-center justify-center space-x-2 text-gray-600">
                {props.item.title}
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-500">
                {props.item.subtitle}
            </div>
            <div className="flex items-center justify-between py-4 space-x-2 text-base">
                <div className="pr-2 text-gray-500 text-center w-1/4 font-semibold">
                    {left.label}
                </div>
                <input
                    onChange={e => props.handleOnChange(Number(e.target.value))}
                    className="w-full slider"
                    type="range"
                    defaultValue={right.value / 2}
                    min={left.value}
                    max={right.value}
                />
                <div className="pl-2 text-gray-500 text-center w-1/4 font-semibold">
                    {right.label}
                </div>
            </div>
        </div>
    );
}
