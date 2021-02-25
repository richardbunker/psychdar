import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AnchorBuilder from "../Anchor/Builder";
import SelectInput from "../../../../../UI/inputs/SelectInput";
import StringCounter from "../../../../../UI/inputs/StringCounter";
import StringInput from "../../../../../UI/inputs/StringInput";
import AnchorPreview from "../Item/AnchorPreview";
import SaveCustomAnchorGroup from "./SaveCustomAnchorGroup";
import RenderCustomAnchorGroups from "./RenderCustomAnchorGroups";

export default function ItemEditor(props) {
    const [type, setType] = useState(props.item.type);
    const [title, setTitle] = useState(props.item.title);
    const [subTitle, setSubTitle] = useState(props.item.subtitle);
    const [anchors, setAnchors] = useState(props.item.anchors);
    const [maxNumberOfAnchors, setMaxNumberOfAnchors] = useState();
    const [canDisplayAnchorBuilder, setCanDisplayAnchorBuilder] = useState(
        true
    );

    const itemOptions = [
        { title: "Options", value: "Options" },
        { title: "Slider", value: "Slider" },
        { title: "Text", value: "Text" },
        { title: "Qualitative", value: "Qualitative" }
    ];

    const [inputFields, setInputFields] = useState({
        title: true,
        type: true,
        validate() {
            return this.title && this.type;
        }
    });

    const updateTitle = string => {
        if (string.length <= 150) {
            setTitle(string);
        }
        if (string.length >= 6) {
            setInputFields(prevState => {
                return { ...prevState, title: true };
            });
        } else {
            setInputFields(prevState => {
                return { ...prevState, title: false };
            });
        }
    };

    const updateSubtitle = string => {
        if (string.length <= 500) {
            setSubTitle(string);
        }
    };

    const onTypeSelect = event => {
        setType(event.target.value);
        handleAnchorType(event.target.value);
    };

    const onNewAnchor = anchor => {
        setAnchors(prevState => {
            const updated = [...prevState, anchor];
            if (updated.length > 1) {
                setInputFields(prevState => {
                    return { ...prevState, type: true };
                });
            }
            return updated;
        });
    };

    const onDeleteAnchor = index => {
        let updatedAnchors = [...anchors];
        updatedAnchors.splice(index, 1);
        setAnchors(updatedAnchors);
        if (updatedAnchors.length < 2) {
            setInputFields(prevState => {
                return { ...prevState, type: false };
            });
        }
    };

    const handleAnchorType = anchorType => {
        setAnchors([]);
        if (anchorType === "Text" || anchorType === "Qualitative") {
            setMaxNumberOfAnchors(0);
            setCanDisplayAnchorBuilder(false);
            setInputFields(prevState => {
                return { ...prevState, type: true };
            });
        }
        if (anchorType === "Slider") {
            setMaxNumberOfAnchors(2);
            setCanDisplayAnchorBuilder(true);
            setInputFields(prevState => {
                return { ...prevState, type: false };
            });
        }
        if (anchorType === "Options") {
            setMaxNumberOfAnchors(11);
            setCanDisplayAnchorBuilder(true);
            setInputFields(prevState => {
                return { ...prevState, type: false };
            });
        }
    };

    const submitItem = () => {
        props.onEditItem([
            props.index,
            {
                title: title,
                subtitle: subTitle,
                type: type,
                anchors: anchors
            }
        ]);
    };

    const onSelectedCustomAnchorGroup = anchorGroup => {
        setAnchors(anchorGroup.anchors);
        setInputFields(prevState => {
            return { ...prevState, type: true };
        });
    };

    return (
        <div className="space-y-2 w-full p-4 rounded bg-gray-100">
            <div className="font-semibold pb-2 text-center text-gray-600 text-xl uppercase">
                Edit Item
            </div>
            <div>
                <StringInput
                    required
                    value={title}
                    handleOnStringChange={e => updateTitle(e.target.value)}
                    title="Title"
                    placeholder="I found it hard to wind down."
                />
                <StringCounter
                    isValid={inputFields.title}
                    number={title.length}
                    max="150"
                />
            </div>
            <div>
                <StringInput
                    required
                    value={subTitle}
                    handleOnStringChange={e => updateSubtitle(e.target.value)}
                    title="Subtitle"
                    placeholder="(optional)"
                />
                {subTitle.length > 0 && (
                    <StringCounter
                        isValid={true}
                        number={subTitle.length}
                        max="500"
                    />
                )}
            </div>
            <SelectInput
                onSelect={onTypeSelect}
                title="Type"
                defaultValue={props.item.type}
                defaultText="Please select..."
                options={itemOptions}
            />
            {(type === "Options" || type === "Slider") && (
                <RenderCustomAnchorGroups
                    onSelectedCustomAnchorGroup={onSelectedCustomAnchorGroup}
                    type={type}
                />
            )}
            {type.length > 0 && canDisplayAnchorBuilder && (
                <div className="flex items-start space-x-2 w-full">
                    <div className="text-gray-600 font-semibold w-1/3"></div>
                    <div className="space-y-3 w-full">
                        <div className="flex items-start justify-between">
                            <div className="text-gray-500 w-full font-semibold flex flex-col space-y-1">
                                {anchors.map((anchor, index) => {
                                    return (
                                        <AnchorPreview
                                            deleteAnchor={onDeleteAnchor}
                                            index={index}
                                            key={uuidv4()}
                                            value={anchor.value}
                                            label={anchor.label}
                                        />
                                    );
                                })}
                            </div>
                            {anchors.length >= 2 && (
                                <SaveCustomAnchorGroup
                                    type={type}
                                    anchors={anchors}
                                />
                            )}
                        </div>
                        {anchors.length < maxNumberOfAnchors && (
                            <div className="space-y-2 py-2">
                                <div className="text-gray-500">
                                    Create Custom
                                </div>
                                <div className="bg-white p-4 rounded shadow">
                                    <AnchorBuilder onNewAnchor={onNewAnchor} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                    onClick={props.onEditCancel}
                    className="bg-gray-400 hover:bg-gray-500 font-bold px-3 py-2 rounded text-white uppercase"
                >
                    Cancel
                </button>
                {inputFields.validate() && (
                    <button
                        onClick={submitItem}
                        className="bg-green-400 hover:bg-green-500 font-bold px-3 py-2 rounded text-white uppercase"
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    );
}
