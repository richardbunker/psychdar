import React from "react";
import { formatNameAndAbbr } from "../../utilities/MeasureFunctions";
import RenderItem from "./Items";

export default function RenderMeasure(props) {
    const { name, abbr, instructions, items } = props.measure;

    const onItemChange = itemValue => {
        props.handleOnItemChange(itemValue);
    };

    return (
        <div className="leading-normal p-6 bg-white rounded space-y-6 shadow">
            <div className="space-y-2">
                <div className="font-semibold text-3xl text-gray-700">
                    {formatNameAndAbbr(name, abbr)}
                </div>
                {instructions && (
                    <div className="space-y-1 text-xl">
                        <div className="font-semibold text-gray-500">
                            Instructions
                        </div>
                        <div className="text-gray-600">{instructions}</div>
                    </div>
                )}
            </div>
            {items.map((item, index) => {
                return (
                    <RenderItem
                        onItemChange={onItemChange}
                        key={"item_" + String(index + 1)}
                        item={item}
                        index={index}
                    />
                );
            })}
        </div>
    );
}
