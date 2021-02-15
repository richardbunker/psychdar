import React, { useEffect, useState } from "react";
import Option from "../Item/Option/Option";
import Qualitative from "../Item/Qualitative";
import Slider from "../Item/Slider/Slider";
import Text from "../Item/Text";

export default function RenderItem(props) {
    const [item, setItem] = useState();

    const itemNumber = index => {
        return String(index);
    };
    const [itemResponse, setItemResponse] = useState("");

    const handleOnChange = value => {
        setItemResponse(value);
        props.onItemChange({
            [itemNumber(props.index)]: value
        });
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
                        id="preview"
                    />
                );
                break;
            case "Slider":
                setItem(
                    <Slider
                        handleOnChange={handleOnChange}
                        item={props.item}
                        index={props.index}
                        id="preview"
                    />
                );
                break;
            case "Qualitative":
                setItem(
                    <Qualitative
                        value={itemResponse}
                        handleOnChange={handleOnChange}
                        item={props.item}
                        index={props.index}
                        id="preview"
                    />
                );
                break;
            case "Text":
                setItem(
                    <Text item={props.item} index={props.index} id="preview" />
                );
                break;
        }
    };

    return (
        <div className="flex items-center justify-between space-x-2">
            <div className="w-full">{item}</div>
        </div>
    );
}
