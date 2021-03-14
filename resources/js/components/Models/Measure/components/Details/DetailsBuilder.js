import React, { useEffect, useState } from "react";
import { validateChronbachsAlpha } from "../../../../../utilities/HelperFunctions";
import QuestionMark from "../../../../UI/dropdowns/QuestionMark";
import ErrorInput from "../../../../UI/inputs/ErrorInput";
import StringCounter from "../../../../UI/inputs/StringCounter";
import TextInput from "../../../../UI/inputs/TextInput";

export default function DetailsBuilder(props) {
    const [details, setDetails] = useState({
        alpha: "",
        author: ""
    });

    useEffect(() => {
        if (props.measure.details) {
            setDetails(props.measure.details);
        }
    }, []);

    const [inputFields, setInputFields] = useState({
        alpha: true,
        author: true,
        validate() {
            return this.alpha && this.author;
        }
    });

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
        if (string.length <= 200) {
            setDetails(prevState => {
                return {
                    ...prevState,
                    author: string
                };
            });
        }
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
                <div className="flex items-center space-x-2 w-full justify-between leading-normal">
                    <div className="flex font-semibold items-center space-x-1 text-gray-600 w-1/3">
                        <span>Alpha Score</span>
                        <QuestionMark
                            position=" top-0 left-0 w-96"
                            text="Chronbach's Alpha is required should you wish to calculate the reliable change index (RCI). An RCI is a psychometric criterion used to evaluate whether change over time of an individual score (i.e., the difference score between two measurements in time) is considered statistically significant."
                            size={8}
                        />
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
                    title="Author & Reference"
                    placeholder="Lovibond, S.H. & Lovibond, P.F. (1995).  Manual for the Depression Anxiety Stress Scales. (2nd. Ed.)  Sydney: Psychology Foundation."
                    handleOnTextChange={e => updateAuthor(e.target.value)}
                />
                <StringCounter
                    number={details.author === null ? 0 : details.author.length}
                    max="200"
                    isValid={true}
                />
            </div>
            {inputFields.validate() && (
                <div className="w-full flex items-center justify-end space-x-2">
                    <button
                        onClick={() => props.toggleModal()}
                        className="font-semibold bg-gray-400 px-3 py-2 rounded text-white hover:bg-gray-500 uppercase hover:shadow"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={updateDetails}
                        className="font-semibold bg-blue-400 px-3 py-2 rounded text-white hover:bg-blue-500 uppercase hover:shadow hover:text-gray-200"
                    >
                        Update
                    </button>
                </div>
            )}
        </div>
    );
}
