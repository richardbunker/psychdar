import React, { useState } from "react";
import { validateDateString } from "../../../utilities/HelperFunctions";
import DateInput from "./DateInput";

export default function DateRangeInput(props) {
    const [dates, setDates] = useState({
        start: "",
        end: ""
    });
    const [inputFields, setInputFields] = useState({
        start: false,
        end: false,
        validate() {
            return this.start && this.end;
        }
    });

    const updateDateRangeStart = value => {
        setDates(prevState => {
            return {
                ...prevState,
                start: value
            };
        });
        setInputFields(prevState => {
            return { ...prevState, start: validateDateString(value) };
        });
    };

    const updateDateRangeEnd = value => {
        setDates(prevState => {
            return {
                ...prevState,
                end: value
            };
        });
        setInputFields(prevState => {
            return { ...prevState, end: validateDateString(value) };
        });
    };
    return (
        <div className="flex items-center space-x-2 w-full">
            <div className="text-gray-600 font-semibold w-1/3">
                {props.title}
            </div>
            <div className="flex items-center justify-between w-full">
                <DateInput
                    handleOnChange={value => updateDateRangeStart(value)}
                    value={dates.start}
                />
                <span className="text-gray-600">to</span>
                <DateInput
                    handleOnChange={value => updateDateRangeEnd(value)}
                    value={dates.end}
                />
            </div>
        </div>
    );
}
