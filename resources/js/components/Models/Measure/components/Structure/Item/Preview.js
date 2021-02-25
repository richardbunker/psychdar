import React, { useEffect, useState } from "react";
import { truncateString } from "../../../../../../utilities/HelperFunctions";
import Option from "../../../../Measure/components/Item/Option/Option";
import Qualitative from "../../../../Measure/components/Item/Qualitative";
import Slider from "../../../../Measure/components/Item/Slider/Slider";
import Text from "../../../../Measure/components/Item/Text";
import ItemEditor from "./Editor";

export default function ItemPreview(props) {
    const [item, setItem] = useState();
    const [value, setValue] = useState("...");
    const [displayItemEdit, setDisplayItemEdit] = useState(false);

    const handleOnChange = value => {
        setValue(value);
    };

    useEffect(() => {
        renderByItemType(props.item.type);
    }, []);

    const renderByItemType = type => {
        switch (type) {
            case "Options":
                setItem(
                    <Option
                        handleOnChange={handleOnChange}
                        item={props.item}
                        index={props.index}
                        id="edit"
                    />
                );
                break;
            case "Slider":
                setItem(
                    <Slider
                        handleOnChange={handleOnChange}
                        item={props.item}
                        index={props.index}
                        id="edit"
                    />
                );
                break;
            case "Qualitative":
                setItem(
                    <Qualitative
                        handleOnChange={handleOnChange}
                        item={props.item}
                        index={props.index}
                        id="edit"
                    />
                );
                break;
            case "Text":
                setItem(
                    <Text item={props.item} index={props.index} id="edit" />
                );
                break;
        }
    };

    const onEditCancel = () => {
        setDisplayItemEdit(false);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between space-x-2">
                {displayItemEdit ? (
                    <ItemEditor
                        index={props.index}
                        item={props.item}
                        onEditItem={props.onEditItem}
                        onEditCancel={onEditCancel}
                    />
                ) : (
                    <>
                        <div className="w-full">{item}</div>
                        <div className="flex flex-col space-y-4">
                            {props.index > 0 && (
                                <button
                                    onClick={() =>
                                        props.onMoveItemUp(props.index)
                                    }
                                >
                                    <svg
                                        className="w-6 h-6 text-teal-400 hover:text-teal-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            )}

                            <button onClick={() => setDisplayItemEdit(true)}>
                                <svg
                                    className="w-6 h-6 text-teal-400 hover:text-teal-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => props.onDeleteItem(props.index)}
                            >
                                <svg
                                    className="w-6 h-6 text-gray-400 hover:text-gray-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {props.index < props.itemsLength - 1 && (
                                <button
                                    onClick={() =>
                                        props.onMoveItemDown(props.index)
                                    }
                                >
                                    <svg
                                        className="w-6 h-6 text-teal-400 hover:text-teal-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className="font-semibold text-green-500 text-right text-sm w-full">
                Value:{" "}
                <span className="text-blue-500">
                    {truncateString(String(value), 6)}
                </span>
            </div>
            <div className="w-full border-b mb-6"></div>
        </div>
    );
}
