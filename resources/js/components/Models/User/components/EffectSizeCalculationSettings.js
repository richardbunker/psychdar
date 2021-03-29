import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import SelectInput from "../../../UI/inputs/SelectInput";
import DateInput from "../../../UI/inputs/DateInput";
import {
    returnCarbonDateStringFormat,
    returnCurrentDateString,
    returnDateString,
    validateDateString
} from "../../../../utilities/HelperFunctions";

export default function EffectSizeCalculationSettings(props) {
    const [values, setValues] = useState({
        dates: {
            start:
                props.data === false
                    ? returnCurrentDateString()
                    : returnDateString(props.data.effect_size_settings.start),
            end:
                props.data === false
                    ? returnCurrentDateString()
                    : returnDateString(props.data.effect_size_settings.end)
        },
        hashedMeasureId: "",
        scale: {}
    });
    const [inputFields, setInputFields] = useState({
        start: true,
        end: true,
        measure: false,
        scale: false,
        validate() {
            return this.start && this.end && this.measure && this.scale;
        }
    });
    const [measureScales, setMeasureScales] = useState([]);

    const userMeasures = props.measures.map(measure => {
        return { title: measure.name, value: measure.hashed_id };
    });

    const updateDateRangeStart = value => {
        setValues(prevState => {
            return {
                ...prevState,
                dates: {
                    ...prevState.dates,
                    start: value
                }
            };
        });
        setInputFields(prevState => {
            return { ...prevState, start: validateDateString(value) };
        });
    };

    const updateDateRangeEnd = value => {
        setValues(prevState => {
            return {
                ...prevState,
                dates: {
                    ...prevState.dates,
                    end: value
                }
            };
        });
        setInputFields(prevState => {
            return { ...prevState, end: validateDateString(value) };
        });
    };

    const showMeasureScales = hashedMeasureId => {
        return props.measures
            .filter(measure => {
                return measure.hashed_id === hashedMeasureId;
            })
            .flatMap(measure => {
                if (measure.scales) {
                    return measure.scales.map(scale => {
                        return { title: scale.title, value: scale.title };
                    });
                } else {
                    setInputFields(prevState => {
                        return { ...prevState, measure: false, scale: false };
                    });
                    return [];
                }
            });
    };

    const getMeasureName = hashedMeasureId => {
        const measure = props.measures.find(measure => {
            return measure.hashed_id === hashedMeasureId;
        });
        return measure.name;
    };

    const onMeasureSelect = hashedMeasureId => {
        setValues(prevState => {
            return {
                ...prevState,
                hashedMeasureId: hashedMeasureId
            };
        });
        setInputFields(prevState => {
            return { ...prevState, measure: true };
        });
        setMeasureScales(showMeasureScales(hashedMeasureId));
    };

    const onScaleSelect = event => {
        const measure = props.measures.find(measure => {
            return measure.hashed_id === values.hashedMeasureId;
        });
        const scale = measure.scales.find(
            scale => scale.title === event.target.value
        );
        setValues(prevState => {
            return {
                ...prevState,
                scale: scale
            };
        });
        setInputFields(prevState => {
            return { ...prevState, scale: true };
        });
    };

    const submit = () => {
        const settings = {
            name: getMeasureName(values.hashedMeasureId),
            scale: values.scale,
            hashedMeasureId: values.hashedMeasureId,
            start: returnCarbonDateStringFormat(values.dates.start),
            end: returnCarbonDateStringFormat(values.dates.end)
        };
        Inertia.post("/user-data", settings);
        props.toggle();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-baseline space-x-2 w-full">
                <div className="text-gray-600 font-semibold w-1/3">
                    Treatments
                </div>
                <div className="flex items-baseline justify-between w-full space-x-4">
                    <DateInput
                        id="started"
                        label="Started"
                        handleOnChange={value => updateDateRangeStart(value)}
                        value={values.dates.start}
                        validInput={inputFields.start}
                    />
                    <span className="text-gray-500 font-semibold">to</span>
                    <DateInput
                        id="completed"
                        label="Completed"
                        handleOnChange={value => updateDateRangeEnd(value)}
                        value={values.dates.end}
                        validInput={inputFields.end}
                    />
                </div>
            </div>
            <SelectInput
                title="Outcome Measure"
                onSelect={event => onMeasureSelect(event.target.value)}
                defaultText="Please Select..."
                defaultValue="Please Select..."
                options={userMeasures}
            />
            {inputFields.measure && (
                <SelectInput
                    title="Scale"
                    onSelect={onScaleSelect}
                    defaultText="Please Select..."
                    defaultValue="Please Select..."
                    options={measureScales}
                />
            )}
            <div className="flex items-center justify-end space-x-2">
                <ButtonGray label="Cancel" handleClick={props.toggle} />
                {inputFields.validate() && (
                    <ButtonTeal label="Submit" handleClick={submit} />
                )}
            </div>
        </div>
    );
}
