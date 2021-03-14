import React from "react";
import RenderItem from "./Items";

export default function RenderMeasure(props) {
    const { name, instructions, items } = props.measure;

    const onItemChange = itemValue => {
        props.handleOnItemChange(itemValue);
    };

    return (
        <div className="leading-normal p-6 bg-white border-2 rounded space-y-6">
            <div className="space-y-2">
                <div className="font-semibold text-3xl text-gray-700">
                    {name}
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
