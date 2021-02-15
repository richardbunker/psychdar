import React from "react";
import "./Option.css";

export default function Option(props) {
    return (
        <div className="leading-normal text-xl">
            <div className="font-semibold flex items-center space-x-2 text-gray-600">
                {props.item.title}
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
                {props.item.subtitle}
            </div>
            <div className="radioButton flex flex-col justify-center py-4 space-y-4">
                {props.item.anchors.map((anchor, anchorIndex) => {
                    return (
                        <div key={anchorIndex} className="">
                            <input
                                onChange={e =>
                                    props.handleOnChange(Number(e.target.value))
                                }
                                style={{
                                    display: "none",
                                    visibility: "hidden",
                                    opacity: 0
                                }}
                                type="radio"
                                id={
                                    props.id +
                                    String(props.index + 1) +
                                    String(anchorIndex)
                                }
                                name={"group" + String(props.index + 1)}
                                value={anchor.value}
                            />
                            <label
                                className="bg-gray-200 cursor-pointer flex hover:bg-gray-300 hover:text-white items-center justify-center p-4 rounded text-center text-gray-600"
                                htmlFor={
                                    props.id +
                                    String(props.index + 1) +
                                    String(anchorIndex)
                                }
                            >
                                {anchor.label}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
