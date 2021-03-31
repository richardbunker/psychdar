import React, { useEffect } from "react";
import "./Slider.css";

export default function Slider(props) {
    const [left, right] = props.item.anchors;

    useEffect(() => {
        props.handleOnChange(Math.round(right.value / 2));
    }, []);
    return (
        <div className="leading-normal text-base sm:text-xl">
            <div className="font-semibold flex items-center justify-center space-x-2 text-gray-600">
                {props.item.title}
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-500">
                {props.item.subtitle}
            </div>
            <div className="hidden sm:flex items-center justify-between py-4 space-x-2 text-base">
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
            <div className="flex flex-col sm:hidden items-center justify-between py-4 space-x-2 text-xs">
                <div className="text-gray-500 flex items-center justify-between font-semibold w-full pb-4">
                    <span className="w-1/2 text-left">{left.label}</span>
                    <span className="w-1/2 text-right">{right.label}</span>
                </div>
                <div className="flex items-center justify-between w-full">
                    <svg
                        className="w-6 h-6 text-gray-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        onChange={e =>
                            props.handleOnChange(Number(e.target.value))
                        }
                        className="w-full slider"
                        type="range"
                        defaultValue={right.value / 2}
                        min={left.value}
                        max={right.value}
                    />
                    <svg
                        className="w-6 h-6 text-gray-500 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
