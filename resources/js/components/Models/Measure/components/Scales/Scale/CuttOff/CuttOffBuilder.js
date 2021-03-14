import React, { useState } from "react";
import { validateString } from "../../../../../../../utilities/HelperFunctions";
import ErrorInput from "../../../../../../UI/inputs/ErrorInput";
import StringCounter from "../../../../../../UI/inputs/StringCounter";
import StringInput from "../../../../../../UI/inputs/StringInput";

export default function CuttOffBuilder(props) {
    const [values, setValues] = useState({
        label: "",
        min: "",
        max: ""
    });
    const [inputFields, setInputFields] = useState({
        label: false,
        min: false,
        max: false,
        validate() {
            return this.label && this.min && this.max;
        }
    });

    const updateLabel = string => {
        if (string.length <= 25) {
            setValues(prevState => {
                return {
                    ...prevState,
                    label: string
                };
            });
        }
        setInputFields(prevState => {
            return { ...prevState, label: validateString(string, 2) };
        });
    };
    const updateNumericField = (string, field) => {
        const reg = new RegExp("^[0-9]+$");
        if (reg.test(string)) {
            setInputFields(prevState => {
                return { ...prevState, [field]: true };
            });
        } else {
            setInputFields(prevState => {
                return { ...prevState, [field]: false };
            });
        }
        setValues(prevState => {
            return {
                ...prevState,
                [field]: Number(string)
            };
        });
    };

    const validate = field => {
        if (values[field] === "") {
            return false;
        } else {
            return !inputFields[field];
        }
    };

    const submitCuttOff = e => {
        props.onNewCuttOff(values);
    };

    const resetCuttOff = () => {
        setValues({
            label: "",
            min: "",
            max: ""
        });
        setInputFields(prevState => {
            return { ...prevState, label: false, min: false, max: false };
        });
    };
    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <StringInput
                    value={values.label}
                    title="Label"
                    handleOnStringChange={e => updateLabel(e.target.value)}
                    placeholder="Mild"
                />
                {values.label.length > 0 && (
                    <StringCounter
                        isValid={inputFields.label}
                        number={values.label.length}
                        max="25"
                    />
                )}
            </div>
            <div className="space-y-1">
                <StringInput
                    value={values.min}
                    title="Min"
                    handleOnStringChange={e =>
                        updateNumericField(e.target.value, "min")
                    }
                    placeholder="4"
                />
                {validate("min") && <ErrorInput error="Must be numeric." />}
            </div>
            <div className="space-y-1">
                <StringInput
                    value={values.max}
                    title="Max"
                    handleOnStringChange={e =>
                        updateNumericField(e.target.value, "max")
                    }
                    placeholder="8"
                />
                {validate("max") && <ErrorInput error="Must be numeric." />}
            </div>
            {inputFields.validate() && (
                <div className="flex items-center justify-end space-x-2 pt-2">
                    <div
                        onClick={resetCuttOff}
                        className="bg-gray-200 font-bold px-3 py-2 rounded text-gray-700 text-sm uppercase cursor-pointer"
                    >
                        Clear
                    </div>
                    <button
                        onClick={submitCuttOff}
                        className="bg-teal-400 font-bold px-3 py-2 rounded text-sm text-white uppercase"
                    >
                        Add CuttOff
                    </button>
                </div>
            )}
        </div>
    );
}
