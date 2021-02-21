import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";
import TreatmentEpisodesRow from "../../../Stats/row/TreatmentEpisodes";
import TotalConsultationsRow from "../../../Stats/row/TotalConsultations";
import TotalAssessmentsRow from "../../../Stats/row/TotalAssessments";
import { sum } from "../../../Stats/Stats";
import UrlRow from "../../../Stats/row/Url";
import SaveableBanner from "../../../UI/SaveableBanner";
import UpdateStatusForm from "../../../UI/forms/UpdateStatusForm";
import { spinnerBootUp } from "../../../UI/spinners/SpinnerBootUp";
import SelectInput from "../../../UI/inputs/SelectInput";

export default function ClientContainer(props) {
    const [selectedMeasure, setSelectedMeasure] = useState("");

    const userMeasures = props.userMeasures.map(measure => {
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

    return props.client.identifier ? (
        <div className="space-y-2 mt-2">
            <div className="bg-white rounded-b">
                <GrayFadedBanner
                    title={props.client.identifier || "Loading..."}
                />
                <div className="text-base py-4 px-6 space-y-4">
                    <TreatmentEpisodesRow
                        iconSize="10"
                        iconColour="text-pink-400"
                        number={props.client.treatments.length}
                    />
                    <TotalConsultationsRow
                        iconSize="10"
                        iconColour="text-indigo-400"
                        number={props.client.treatments
                            .map(treatment => {
                                return treatment.consultation_count;
                            })
                            .reduce(sum, 0)}
                    />
                    <TotalAssessmentsRow
                        iconSize="10"
                        iconColour="text-green-400"
                        number={props.client.treatments
                            .map(treatment => {
                                return treatment.assessments.length;
                            })
                            .reduce(sum, 0)}
                    />
                </div>
            </div>
            <div className="bg-white rounded">
                <div className="w-full rounded-t text-base font-bold text-gray-400 p-2 bg-white uppercase text-left">
                    Measures
                </div>
                <div className="text-base pt-2 pb-6 px-6 space-y-4">
                    <div className="flex items-center justify-between w-full">
                        {selectedMeasure.length === 0 && (
                            <SelectInput
                                title="Add Measure URL"
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
                                        className="bg-gray-400 font-bold hover:bg-gray-500 ml-2 px-3 py-2 rounded text-sm text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => submitAddMeasure()}
                                        className="bg-green-400 font-bold hover:bg-green-500 ml-2 px-3 py-2 rounded text-sm text-white"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {props.client.measures.map((measure, index) => {
                        return (
                            <UrlRow
                                key={index}
                                heading={measure.name}
                                iconSize="6"
                                iconColour="text-gray-500"
                                link={
                                    props.client.url + "/" + measure.hashed_id
                                }
                            />
                        );
                    })}
                </div>
            </div>
            <div className="bg-white rounded">
                <SaveableBanner
                    title="Client Settings"
                    savedAt={props.savedAt}
                />
                <div className="text-base pt-2 pb-6 px-6 space-y-4">
                    <UpdateStatusForm
                        title="Client Status"
                        onStatusUpdate={props.onStatusUpdate}
                        currentStatus={props.client.is_active}
                        identifier="active"
                        truthyLabel="Active"
                        falseyLabel="Archived"
                    />
                    <UpdateStatusForm
                        title="URL Access"
                        onStatusUpdate={props.onStatusUpdate}
                        currentStatus={
                            props.client.preferences.create_own_resources
                        }
                        identifier="url"
                        truthyLabel="Allowed"
                        falseyLabel="Disabled"
                    />
                    <UpdateStatusForm
                        title="Statistical Analyses"
                        onStatusUpdate={props.onStatusUpdate}
                        currentStatus={
                            props.client.preferences.include_in_analyses
                        }
                        identifier="stats"
                        truthyLabel="Included"
                        falseyLabel="Excluded"
                    />
                </div>
            </div>
        </div>
    ) : (
        spinnerBootUp()
    );
}
