import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import AnchorBuilder from "../Anchor/Builder";
import SelectInput from "../../../../../UI/inputs/SelectInput";
import StringCounter from "../../../../../UI/inputs/StringCounter";
import StringInput from "../../../../../UI/inputs/StringInput";
import AnchorPreview from "../Item/AnchorPreview";
import SaveCustomAnchorGroup from "./SaveCustomAnchorGroup";
import RenderCustomAnchorGroups from "./RenderCustomAnchorGroups";

export default function ItemBuilder(props) {
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    });

    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [anchors, setAnchors] = useState([]);
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
        title: false,
        type: false,
        validate() {
            return this.title && this.type;
        }
    });

    const validateTitle = string => {
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

    const updateTitle = string => {
        if (string.length <= 150) {
            setTitle(string);
        }
        validateTitle(string);
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
        props.onNewItem({
            title: title,
            subtitle: subTitle,
            type: type,
            anchors: anchors
        });
    };

    const onSelectedCustomAnchorGroup = anchorGroup => {
        setAnchors(anchorGroup.anchors);
        setInputFields(prevState => {
            return { ...prevState, type: true };
        });
    };

    return (
        <div className="space-y-2">
            <div>
                <StringInput
                    required
                    value={title}
                    handleOnStringChange={e => updateTitle(e.target.value)}
                    title="Title"
                    placeholder="I found it hard to wind down."
                />
                {title.length > 0 && (
                    <StringCounter
                        isValid={inputFields.title}
                        number={title.length}
                        max="150"
                    />
                )}
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
                defaultText="Please Select..."
                defaultValue="Please Select..."
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
                            <div className="bg-gray-50 border p-4 rounded">
                                <div className="font-semibold pb-2 text-base text-gray-400 uppercase">
                                    Custom Anchor
                                </div>
                                <AnchorBuilder onNewAnchor={onNewAnchor} />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {inputFields.validate() && (
                <div className="flex items-center justify-end space-x-2 pt-2">
                    <button
                        onClick={submitItem}
                        className="bg-green-400 font-bold px-3 py-2 rounded text-white uppercase"
                    >
                        Add Item
                    </button>
                </div>
            )}
            <div ref={divRef} />
        </div>
    );
}
