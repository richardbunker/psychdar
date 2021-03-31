import React from "react";
import ButtonBlueLarge from "../../../../UI/buttons/ButtonBlueLarge";
import RenderItem from "./Items";

export default function RenderMeasure(props) {
    const { name, instructions, items } = props.measure.structure;

    const onItemChange = itemValue => {
        props.handleOnItemChange(itemValue);
    };

    return (
        <div className="leading-normal lg:p-20 sm:p-10 p-5 bg-white sm:space-y-10 space-y-16 border-t-8 border-b-8 border-teal-400">
            <div className="space-y-6">
                <div className="font-semibold text-xl sm:text-3xl text-teal-600 w-full text-center">
                    {name}
                </div>
                {instructions && (
                    <div className="space-y-1 text-sm sm:text-xl">
                        <div className="font-semibold text-gray-500">
                            Instructions
                        </div>
                        <div className="text-gray-600">{instructions}</div>
                    </div>
                )}
                {props.measure.details && props.measure.details.author && (
                    <div className="space-y-1 text-xs sm:text-base">
                        <div className="font-semibold text-gray-500">
                            Reference
                        </div>
                        <div className="text-gray-400 leading-tight">
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
            <div className="flex items-center justify-center">
                <ButtonBlueLarge
                    handleClick={props.handleSubmit}
                    label="Submit"
                />
            </div>
        </div>
    );
}
