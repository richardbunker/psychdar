import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import UrlRow from "../../../Stats/row/Url";
import SelectInput from "../../../UI/inputs/SelectInput";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";

export default function ClientMeasures(props) {
    const [selectedMeasure, setSelectedMeasure] = useState("");

    const userMeasures = props.userPublishedMeasures.map(measure => {
        return { title: measure.name, value: measure.hashed_id };
    });

    const clientMeasures = props.client.measures.map(measure => {
        return { title: measure.name, value: measure.hashed_id };
    });

    let addableMeasures = userMeasures;

    clientMeasures.forEach(clientMeasure => {
        addableMeasures = addableMeasures.filter(
            userMeasure => userMeasure.value !== clientMeasure.value
        );
    });

    const onSelect = event => {
        setSelectedMeasure(event.target.value);
    };

    const submitAddMeasure = () => {
        const values = {
            measureHashedId: selectedMeasure,
            clientHashedId: props.client.hashed_id
        };
        setSelectedMeasure("");
        Inertia.post("/client-measure", values);
    };

    return (
        <div className="text-lg py-4 px-6 space-y-4">
            <div className="flex items-center justify-between w-full py-2 h-12">
                {selectedMeasure.length === 0 && (
                    <SelectInput
                        title="Add Measure"
                        onSelect={onSelect}
                        defaultText="Please Select..."
                        defaultValue="Please Select..."
                        options={addableMeasures}
                    />
                )}
                {selectedMeasure.length > 0 && (
                    <div className="flex items-center justify-between w-full">
                        <div className="text-gray-600 font-semibold">
                            {"Add " +
                                userMeasures.find(
                                    x => x.value === selectedMeasure
                                ).title +
                                "?"}
                        </div>
                        <div className="flex items-center space-x-2">
                            <ButtonGray
                                handleClick={() => setSelectedMeasure("")}
                                label="Cancel"
                            />
                            <ButtonTeal
                                handleClick={submitAddMeasure}
                                label="Confirm"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="space-y-3 py-1">
                {props.client.measures.map((measure, index) => {
                    return (
                        <UrlRow
                            key={index}
                            heading={measure.name}
                            iconSize="6"
                            iconColour="text-gray-500"
                            link={props.client.url + "/" + measure.hashed_id}
                        />
                    );
                })}
            </div>
        </div>
    );
}
