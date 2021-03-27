import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import SelectInput from "../../../UI/inputs/SelectInput";

export default function ChangeEffectSizeMeasure(props) {
    const [selectedMeasure, setSelectedMeasure] = useState("");
    const [measureScales, setMeasureScales] = useState({});
    const [selectedScale, setSelectedScale] = useState("");
    const [displaySelectScales, setDisplaySelectScales] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    const userMeasures = props.measures.map(measure => {
        return { title: measure.name, value: measure.hashed_id };
    });

    const showMeasureScales = hashedMeasureId => {
        return props.measures
            .filter(measure => {
                return measure.hashed_id === hashedMeasureId;
            })
            .flatMap(measure => {
                return measure.scales.map(scale => {
                    return { title: scale.title, value: scale.title };
                });
            });
    };

    const getMeasureName = hashedMeasureId => {
        const measure = props.measures.find(measure => {
            return measure.hashed_id === hashedMeasureId;
        });
        return measure.name;
    };

    const onMeasureSelect = event => {
        setSelectedMeasure(event.target.value);
        setMeasureScales(showMeasureScales(event.target.value));
        setDisplaySelectScales(true);
        setCanSubmit(false);
    };

    const onScaleSelect = event => {
        const measure = props.measures.find(measure => {
            return measure.hashed_id === selectedMeasure;
        });
        const scale = measure.scales.find(
            scale => scale.title === event.target.value
        );
        setSelectedScale(scale);
        setCanSubmit(true);
    };

    const submit = () => {
        const values = {
            effectSizeSettings: {
                name: getMeasureName(selectedMeasure),
                scale: selectedScale,
                hashedMeasureId: selectedMeasure
            }
        };
        Inertia.post("/user-data", values);
        props.toggle();
    };

    return (
        <div className="space-y-2">
            <SelectInput
                title="Outcome Measure"
                onSelect={onMeasureSelect}
                defaultText="Please Select..."
                defaultValue="Please Select..."
                options={userMeasures}
            />
            {displaySelectScales && (
                <SelectInput
                    title="Scale"
                    onSelect={onScaleSelect}
                    defaultText="Please Select..."
                    defaultValue="Please Select..."
                    options={measureScales}
                />
            )}
            {canSubmit && (
                <div className="flex items-center justify-end space-x-2">
                    <ButtonGray label="Cancel" handleClick={props.toggle} />
                    <ButtonTeal label="Submit" handleClick={submit} />
                </div>
            )}
        </div>
    );
}
