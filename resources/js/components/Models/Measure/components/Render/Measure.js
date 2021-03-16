import React from "react";
import RenderItem from "./Items";

export default function RenderMeasure(props) {
    const { name, instructions, items } = props.measure.structure;

    const onItemChange = itemValue => {
        props.handleOnItemChange(itemValue);
    };

    return (
        <div className="leading-normal p-10 bg-white border-2 rounded space-y-10">
            <div className="space-y-4">
                <div className="font-semibold text-3xl text-gray-700 w-full text-center">
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
                {props.measure.details && props.measure.details.author && (
                    <div className="space-y-1 text-base">
                        <div className="font-semibold text-gray-500">
                            Reference
                        </div>
                        <div className="text-gray-600 text-sm">
                            {props.measure.details.author}
                        </div>
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
