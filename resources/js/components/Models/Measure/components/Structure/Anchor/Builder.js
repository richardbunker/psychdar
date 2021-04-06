import React, { useEffect, useRef, useState } from "react";
import ErrorInput from "../../../../../UI/inputs/ErrorInput";
import StringCounter from "../../../../../UI/inputs/StringCounter";
import StringInput from "../../../../../UI/inputs/StringInput";

export default function AnchorBuilder(props) {
    const [label, setLabel] = useState("");
    const [value, setValue] = useState("");
    const [inputFields, setInputFields] = useState({
        label: false,
        value: false,
        validate() {
            return this.label && this.value;
        }
    });

    const updateLabel = string => {
        if (string.length <= 150) {
            setLabel(string);
        }
        if (string.length >= 2) {
            setInputFields(prevState => {
                return { ...prevState, label: true };
            });
        } else {
            setInputFields(prevState => {
                return { ...prevState, label: false };
            });
        }
    };

    const updateValue = string => {
        const reg = new RegExp("^[0-9]+$");
        if (reg.test(string)) {
            setInputFields(prevState => {
                return { ...prevState, value: true };
            });
            setValue(parseInt(string));
        } else {
            setInputFields(prevState => {
                return { ...prevState, value: false };
            });
            setValue(string);
        }
    };

    const validateValue = () => {
        if (value === "") {
            return false;
        } else {
            return !inputFields.value;
        }
    };

    const submitAnchor = e => {
        props.onNewAnchor({ label: label, value: value });
        resetAnchor();
    };

    const resetAnchor = () => {
        setLabel("");
        setValue("");
        setInputFields(prevState => {
            return { ...prevState, value: false, label: false };
        });
    };

    return (
        <div className="space-y-2">
            <div>
                <StringInput
                    shouldInputBeFocused={true}
                    required
                    value={label}
                    handleOnStringChange={e => updateLabel(e.target.value)}
                    title="Label"
                    placeholder="Sometimes"
                />
                {label.length > 0 && (
                    <StringCounter
                        isValid={inputFields.label}
                        number={label.length}
                        max="150"
                    />
                )}
            </div>
            <StringInput
                required
                value={value}
                handleOnStringChange={e => updateValue(e.target.value)}
                title="Value"
                placeholder="1"
            />
            {validateValue() && <ErrorInput error="A value must be number." />}
            {inputFields.validate() && (
                <div className="flex items-center justify-end space-x-2 pt-2">
                    <div
                        onClick={resetAnchor}
                        className="bg-gray-200 font-bold px-3 py-2 rounded text-gray-700 text-sm uppercase cursor-pointer"
                    >
                        Clear
                    </div>
                    <button
                        onClick={submitAnchor}
                        className="bg-teal-400 font-bold px-3 py-2 rounded text-sm text-white uppercase"
                    >
                        Add Anchor
                    </button>
                </div>
            )}
        </div>
    );
}
