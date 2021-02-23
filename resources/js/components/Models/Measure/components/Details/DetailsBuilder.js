import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    validateChronbachsAlpha,
    validateString
} from "../../../../../utilities/HelperFunctions";
import TealButton from "../../../../UI/buttons/TealButton";
import CancelableContainer from "../../../../UI/containers/CancelableContainer";
import ErrorInput from "../../../../UI/inputs/ErrorInput";
import StringCounter from "../../../../UI/inputs/StringCounter";
import TextInput from "../../../../UI/inputs/TextInput";
import ScaleBuilder from "../../../Measure/components/Details/Scales/ScaleBuilder";
import ScalePreview from "./Scales/ScalePreview";

export default function DetailsBuilder(props) {
    const [details, setDetails] = useState({
        alpha: "",
        author: "",
        scales: []
    });

    useState(() => {
        if (props.measure.details) {
            setDetails(props.measure.details);
        }
    }, []);

    const [inputFields, setInputFields] = useState({
        alpha: true,
        author: true,
        scales: true,
        validate() {
            return this.alpha && this.author && this.scales;
        }
    });

    const [displayScaleBuilder, setDisplayScaleBuilder] = useState(false);

    const updateAlpha = string => {
        if (string.length <= 4) {
            setDetails(prevState => {
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

    const updateAuthor = string => {
        if (string.length <= 100) {
            setDetails(prevState => {
                return {
                    ...prevState,
                    author: string
                };
            });
        }
    };

    const toggleScaleBuilder = () => {
        setDisplayScaleBuilder(prevState => !prevState);
    };

    const onSubmitScale = scaleObject => {
        setDetails(prevState => {
            return { ...prevState, scales: [...prevState.scales, scaleObject] };
        });
        setDisplayScaleBuilder(false);
    };

    const onDeleteScale = index => {
        let updatedScales = [...details.scales];
        updatedScales.splice(index, 1);
        setDetails(prevState => {
            return { ...prevState, scales: updatedScales };
        });
    };

    const updateDetails = () => {
        let alpha;
        if (details.alpha !== "") {
            alpha = details.alpha === null ? "" : Number(details.alpha);
            props.onDetailsSubmit({
                ...details,
                alpha: alpha
            });
        } else {
            props.onDetailsSubmit(details);
        }
    };
    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <div className="flex items-center space-x-2 w-full justify-between">
                    <div className="text-gray-600 font-semibold w-1/3">
                        Chronbach's Alpha
                    </div>
                    <input
                        value={details.alpha === null ? "" : details.alpha}
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
            <div className="space-y-1">
                <TextInput
                    value={details.author === null ? "" : details.author}
                    title="Author/Reference"
                    handleOnTextChange={e => updateAuthor(e.target.value)}
                />
                <StringCounter
                    number={details.author === null ? 0 : details.author.length}
                    max="100"
                    isValid={true}
                />
            </div>
            {details.scales.length > 0 && (
                <div className="flex items-start space-x-2 w-full">
                    <div className="text-gray-600 font-semibold w-1/3">
                        Scales
                    </div>
                    <div className="space-y-3 w-full">
                        <div className="flex items-start justify-between">
                            <div className="text-gray-500 w-full font-semibold flex flex-col space-y-1">
                                {details.scales.map((scale, index) => {
                                    return (
                                        <ScalePreview
                                            index={index}
                                            deleteScaleItem={onDeleteScale}
                                            key={uuidv4()}
                                            scale={scale}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!displayScaleBuilder && (
                <div className="w-full">
                    <button
                        onClick={() => toggleScaleBuilder()}
                        className="border-2 border-teal-300 font-semibold hover:bg-teal-50 px-3 py-4 rounded text-teal-400 uppercase w-full"
                    >
                        Add Scale
                    </button>
                </div>
            )}
            {displayScaleBuilder && (
                <CancelableContainer
                    heading="Scale Details"
                    toggleSelf={toggleScaleBuilder}
                >
                    <ScaleBuilder
                        toggleSelf={setDisplayScaleBuilder}
                        onSubmitScale={onSubmitScale}
                        items={props.measure.structure.items}
                    />
                </CancelableContainer>
            )}
            {inputFields.validate() && (
                <div className="w-full flex items-center justify-end space-x-2">
                    <button
                        onClick={() => props.toggleModal()}
                        className="bg-gradient-to-tl font-semibold from-gray-500 px-3 py-2 rounded text-white to-gray-400 uppercase"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={updateDetails}
                        className="bg-gradient-to-tl font-semibold from-blue-500 px-3 py-2 rounded text-white to-blue-400 uppercase"
                    >
                        Update
                    </button>
                </div>
            )}
        </div>
    );
}
