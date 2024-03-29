import React, { useState } from "react";
import StringInput from "../../../../../UI/inputs/StringInput";
import {
    truncateString,
    validateChronbachsAlpha,
    validateString
} from "../../../../../../utilities/HelperFunctions";
import StringCounter from "../../../../../UI/inputs/StringCounter";
import Checkbox from "../../../../../UI/inputs/Checkbox";
import SelectInput from "../../../../../UI/inputs/SelectInput";
import CuttOffBuilder from "./CuttOff/CuttOffBuilder";
import CuttOffPreview from "./CuttOff/CuttOffPreview";
import { v4 as uuidv4 } from "uuid";
import CancelableContainer from "../../../../../UI/containers/CancelableContainer";
import CuttOffEditor from "./CuttOff/CuttOffEditor";
import QuestionMark from "../../../../../UI/dropdowns/QuestionMark";
import ErrorInput from "../../../../../UI/inputs/ErrorInput";

export default function ScaleBuilder(props) {
    const [scale, setScale] = useState({
        title: "",
        alpha: "",
        sd: "",
        operation: "Please Select...",
        items: [],
        cuttOffs: []
    });
    const [cuttOffEditing, setCuttOffEditing] = useState({});
    const [displayCuttOffBuilder, setDisplayCuttOffBuilder] = useState(false);
    const [displayCuttOffEditor, setDisplayCuttOffEditor] = useState(false);
    const [inputFields, setInputFields] = useState({
        title: false,
        alpha: true,
        sd: true,
        operation: false,
        scaleItems: false,
        validate() {
            return (
                this.title && this.operation && this.scaleItems && this.alpha
            );
        }
    });

    const updateAlpha = string => {
        if (string.length <= 4) {
            setScale(prevState => {
                return {
                    ...prevState,
                    alpha: string
                };
            });
        }
        setInputFields(prevState => {
            return { ...prevState, alpha: validateChronbachsAlpha(string) };
        });
    };

    const updateStandardDeviation = string => {
        if (string.length <= 4) {
            setScale(prevState => {
                return {
                    ...prevState,
                    sd: string
                };
            });
        }
        setInputFields(prevState => {
            return { ...prevState, sd: validateChronbachsAlpha(string) };
        });
    };

    const handleOnCheckboxChange = stringVal => {
        const value = Number(stringVal);
        setScale(prevState => {
            let updatedScaleItemsArray = [];
            if (prevState.items.includes(value)) {
                updatedScaleItemsArray = [...prevState.items].filter(
                    el => el !== value
                );
            } else {
                updatedScaleItemsArray = [...prevState.items, value];
            }
            setInputFields(prevState => {
                return {
                    ...prevState,
                    scaleItems:
                        updatedScaleItemsArray.length >= 1 ? true : false
                };
            });
            return { ...prevState, items: updatedScaleItemsArray.sort() };
        });
    };

    const handleOnSelect = value => {
        setScale(prevState => {
            return { ...prevState, operation: value };
        });
        setInputFields(prevState => {
            return { ...prevState, operation: true };
        });
    };

    const updateTitle = string => {
        if (string.length <= 25) {
            setScale(prevState => {
                return { ...prevState, title: string };
            });
            setInputFields(prevState => {
                return { ...prevState, title: validateString(string, 2) };
            });
        }
    };

    const toggleCuttOffBuilder = () => {
        setDisplayCuttOffBuilder(prevState => !prevState);
    };

    const toggleCuttOffEditor = () => {
        setDisplayCuttOffEditor(prevState => !prevState);
    };

    const onNewCuttOff = newCuttOff => {
        setScale(prevState => {
            return {
                ...prevState,
                cuttOffs: [...prevState.cuttOffs, newCuttOff]
            };
        });
        setDisplayCuttOffBuilder(false);
    };

    const onDeleteCuttOff = index => {
        let updatedCuttOffs = [...scale.cuttOffs];
        updatedCuttOffs.splice(index, 1);
        setScale(prevState => {
            return { ...prevState, cuttOffs: updatedCuttOffs };
        });
    };

    const onEditCuttOff = index => {
        setCuttOffEditing({ cuttOff: scale.cuttOffs[index], index: index });
        toggleCuttOffEditor();
    };

    const onSubmitEditedCuttOff = editingObject => {
        let updatedCuttOffs = [...scale.cuttOffs];
        updatedCuttOffs.splice(editingObject.index, 1, editingObject.cuttOff);
        setScale(prevState => {
            return {
                ...prevState,
                cuttOffs: updatedCuttOffs
            };
        });
        toggleCuttOffEditor();
    };

    const submitScale = () => {
        props.onSubmitScale(scale);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <StringInput
                    shouldInputBeFocused={true}
                    value={scale.title}
                    handleOnStringChange={e => updateTitle(e.target.value)}
                    title="Title"
                    placeholder="Total Score"
                />
                {scale.title.length > 0 && (
                    <StringCounter
                        isValid={inputFields.title}
                        number={scale.title.length}
                        max="25"
                    />
                )}
            </div>
            <div className="flex items-start space-x-2 w-full font-normal">
                <div className="text-gray-600 w-1/3 font-semibold">Items</div>
                <div className="space-y-2 text-base w-full font-medium">
                    {props.items.map((item, index) => {
                        return (
                            <Checkbox
                                onCheckboxChange={e =>
                                    handleOnCheckboxChange(e)
                                }
                                key={index}
                                disabled={
                                    ["Text", "Qualitative"].indexOf(
                                        item.type
                                    ) !== -1
                                        ? true
                                        : false
                                }
                                checked={
                                    scale.items.indexOf(index) !== -1
                                        ? true
                                        : false
                                }
                                value={index}
                                label={
                                    truncateString(item.title, 25) +
                                    " (item_" +
                                    String(index) +
                                    ")"
                                }
                            />
                        );
                    })}
                </div>
            </div>
            <div className="space-y-1">
                <div className="flex font-semibold items-center space-x-1 text-gray-600 pb-2">
                    <span>Reliable Change Index</span>
                    <QuestionMark
                        position=" top-0 left-0 w-96"
                        text="Chronbach's Alpha and a Standard Deviation (Clinical Sample) is required should you wish to calculate the reliable change index (RCI). An RCI is a psychometric criterion used to evaluate whether change over time of an individual score (i.e., the difference score between two measurements in time) is considered statistically significant."
                        size={8}
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center space-x-2 w-full justify-between leading-normal">
                        <div className="font-semibold text-sm space-y-1 text-gray-500 w-1/3">
                            <div>Standard Deviation</div>
                        </div>
                        <input
                            value={scale.sd === null ? "" : scale.sd}
                            onChange={e =>
                                updateStandardDeviation(e.target.value)
                            }
                            type="text"
                            className="bg-white font-semibold mr-auto px-2 py-1 rounded shadow text-gray-600 w-full"
                            placeholder="0.75"
                            required
                        />
                    </div>
                    {!inputFields.sd && (
                        <ErrorInput error="Must be a number between 0 and 1." />
                    )}
                </div>
                <div className="space-y-1">
                    <div className="flex items-center space-x-2 w-full justify-between leading-normal">
                        <div className="flex font-semibold items-center space-x-1 text-gray-500 w-1/3 text-sm">
                            <span>Alpha Score</span>
                        </div>
                        <input
                            value={scale.alpha === null ? "" : scale.alpha}
                            onChange={e => updateAlpha(e.target.value)}
                            type="text"
                            className="bg-white font-semibold mr-auto px-2 py-1 rounded shadow text-gray-600 w-full"
                            placeholder="0.95"
                            required
                        />
                    </div>
                    {!inputFields.alpha && (
                        <ErrorInput error="Must be a number between 0 and 1." />
                    )}
                </div>
            </div>
            <SelectInput
                onSelect={e => handleOnSelect(e.target.value)}
                title="Operation"
                defaultText="Please Select..."
                defaultValue={scale.operation}
                options={[
                    { title: "Mean", value: "Mean" },
                    { title: "Sum", value: "Sum" }
                ]}
            />
            {displayCuttOffEditor ? (
                <CancelableContainer
                    heading="Edit Cuttoff"
                    toggleSelf={toggleCuttOffEditor}
                >
                    <CuttOffEditor
                        editing={cuttOffEditing}
                        onEditCuttOff={onSubmitEditedCuttOff}
                    />
                </CancelableContainer>
            ) : (
                <>
                    {scale.cuttOffs.length > 0 && (
                        <div className="flex items-start space-x-2 w-full">
                            <div className="text-gray-600 font-semibold w-1/3"></div>
                            <div className="space-y-3 w-full">
                                <div className="flex items-start justify-between">
                                    <div className="text-gray-500 w-full font-semibold flex flex-col space-y-1">
                                        {scale.cuttOffs.map(
                                            (cuttOff, index) => {
                                                return (
                                                    <CuttOffPreview
                                                        index={index}
                                                        deleteCuttOff={
                                                            onDeleteCuttOff
                                                        }
                                                        editCuttOff={
                                                            onEditCuttOff
                                                        }
                                                        key={uuidv4()}
                                                        alert={cuttOff.alert}
                                                        label={cuttOff.label}
                                                        min={cuttOff.min}
                                                        max={cuttOff.max}
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!displayCuttOffBuilder && (
                        <div className="w-full">
                            <button
                                onClick={() => toggleCuttOffBuilder()}
                                className="border-2 bg-white border-teal-300 font-semibold hover:bg-teal-50 px-3 py-4 rounded text-teal-400 uppercase w-full"
                            >
                                Create Cutoff
                            </button>
                        </div>
                    )}
                    {displayCuttOffBuilder && (
                        <CancelableContainer
                            heading="Cutoff Details"
                            toggleSelf={toggleCuttOffBuilder}
                        >
                            <CuttOffBuilder onNewCuttOff={onNewCuttOff} />
                        </CancelableContainer>
                    )}
                </>
            )}
            {inputFields.validate() && (
                <div className="flex items-center justify-end space-x-2 pt-2">
                    <button
                        onClick={submitScale}
                        className="bg-blue-400 px-3 py-2 rounded text-white uppercase"
                    >
                        Add Scale
                    </button>
                </div>
            )}
        </div>
    );
}
