import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import UrlRow from "../../../Stats/row/Url";
import SelectInput from "../../../UI/inputs/SelectInput";

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
            <div className="flex items-center justify-between w-full">
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
                        <div className="text-gray-600">
                            {"Add " +
                                userMeasures.find(
                                    x => x.value === selectedMeasure
                                ).title +
                                "?"}
                        </div>
                        <div>
                            <button
                                onClick={() => setSelectedMeasure("")}
                                className="bg-gray-400 hover:bg-gray-500 ml-2 px-3 py-2 rounded text-base text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => submitAddMeasure()}
                                className="bg-green-400 hover:bg-green-500 ml-2 px-3 py-2 rounded text-base text-white"
                            >
                                Confirm
                            </button>
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
