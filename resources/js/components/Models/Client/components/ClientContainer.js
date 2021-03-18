import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import TreatmentEpisodesRow from "../../../Stats/row/TreatmentEpisodes";
import TotalAssessmentsRow from "../../../Stats/row/TotalAssessments";
import { sum } from "../../../Stats/Stats";
import UrlRow from "../../../Stats/row/Url";
import UpdateStatusForm from "../../../UI/forms/UpdateStatusForm";
import SelectInput from "../../../UI/inputs/SelectInput";
import GrayFadedMenuBanner from "../../../UI/GrayFadedMenuBanner";
import ButtonBlue from "../../../UI/buttons/ButtonBlue";
import ModalScrollable from "../../../UI/modals/Scrollable";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";
import OpenCloseContainer from "../../../UI/dropdowns/OpenCloseContainer";
import AssessmentContainer from "../../Assessment/components/AssessmentContainer";

export default function ClientContainer(props) {
    const [selectedMeasure, setSelectedMeasure] = useState("");
    const [clientSettings, setClientSettings] = useState({
        active: props.client.is_active,
        url: props.client.preferences.create_own_resources,
        stats: props.client.preferences.include_in_analyses
    });
    const [displayClientSettings, setDisplayClientSettings] = useState(false);
    const [displayTreatmentSettings, setDisplayTreatmentSettings] = useState(
        false
    );

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

    const toggleDisplayClientSettings = () => {
        setDisplayClientSettings(prevState => !prevState);
    };

    const toggleDisplayTreatmentSettings = () => {
        setDisplayTreatmentSettings(prevState => !prevState);
    };

    const onSelect = event => {
        setSelectedMeasure(event.target.value);
    };

    const onStatusUpdate = statusObject => {
        setClientSettings(prevState => {
            return {
                ...prevState,
                [statusObject.identifier]: statusObject.value
            };
        });
    };

    const submitClientSettings = () => {
        const values = {
            ...clientSettings,
            clientHashedId: props.client.hashed_id
        };
        console.log(values);
        Inertia.post("/client-settings", values);
        toggleDisplayClientSettings();
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
        <div className="">
            {displayTreatmentSettings && (
                <ModalScrollable heading="Active Treatment Episodes">
                    {props.client.active_treatments.length === 0 && (
                        <div className="leading-normal p-4 text-gray-700 text-lg">
                            There are currently no active treatement episodes to
                            manage. A new treatment episode will automatically
                            be created when a client submits an assessment via
                            their unique public URL.
                        </div>
                    )}
                    <div className="flex items-center justify-end space-x-2 ml-auto">
                        <ButtonGray
                            label="Close"
                            handleClick={toggleDisplayTreatmentSettings}
                        />
                        {props.client.active_treatments.length > 0 && (
                            <ButtonTeal
                                label="Update"
                                handleClick={toggleDisplayTreatmentSettings}
                            />
                        )}
                    </div>
                </ModalScrollable>
            )}
            {displayClientSettings && (
                <ModalScrollable heading="Client Settings">
                    <div className="text-lg pt-2 pb-6 px-6 space-y-4">
                        <UpdateStatusForm
                            title="Client Status"
                            onStatusUpdate={onStatusUpdate}
                            currentStatus={clientSettings.active}
                            identifier="active"
                            truthyLabel="Active"
                            falseyLabel="Archived"
                        />
                        <UpdateStatusForm
                            title="Public URL Access"
                            onStatusUpdate={onStatusUpdate}
                            currentStatus={clientSettings.url}
                            identifier="url"
                            truthyLabel="Allowed"
                            falseyLabel="Disabled"
                        />
                        <UpdateStatusForm
                            title="Statistical Analyses"
                            onStatusUpdate={onStatusUpdate}
                            currentStatus={clientSettings.stats}
                            identifier="stats"
                            truthyLabel="Included"
                            falseyLabel="Excluded"
                        />
                    </div>
                    <div className="flex items-center justify-end space-x-2 w-80 ml-auto">
                        <ButtonGray
                            label="Close"
                            handleClick={toggleDisplayClientSettings}
                        />
                        <ButtonTeal
                            label="Update"
                            handleClick={submitClientSettings}
                        />
                    </div>
                </ModalScrollable>
            )}
            <div className="bg-white">
                <GrayFadedMenuBanner title={props.client.identifier}>
                    <ButtonBlue
                        handleClick={toggleDisplayClientSettings}
                        label="Settings"
                    />
                </GrayFadedMenuBanner>
                <div className="text-lg py-4 px-6 space-y-4">
                    <TreatmentEpisodesRow
                        iconSize="10"
                        iconColour="text-pink-400"
                        number={props.client.treatments.length}
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
            <div className="space-y-2 mt-2">
                <div className="bg-white">
                    <GrayFadedBanner title="Measures" />
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
                                            onClick={() =>
                                                setSelectedMeasure("")
                                            }
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
                        {props.client.measures.map((measure, index) => {
                            return (
                                <UrlRow
                                    key={index}
                                    heading={measure.name}
                                    iconSize="6"
                                    iconColour="text-gray-500"
                                    link={
                                        props.client.url +
                                        "/" +
                                        measure.hashed_id
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="bg-white">
                    <GrayFadedMenuBanner title="Treatment Episodes">
                        <ButtonBlue
                            handleClick={toggleDisplayTreatmentSettings}
                            label="Manage Active"
                        />
                    </GrayFadedMenuBanner>
                    <div className="bg-gray-100 space-y-2">
                        {props.client.treatments.map((treatment, index) => {
                            return (
                                <OpenCloseContainer
                                    key={index}
                                    title={
                                        treatment.started +
                                        " - " +
                                        treatment.ended
                                    }
                                >
                                    <AssessmentContainer
                                        treatmentHashedId={treatment.hashed_id}
                                    />
                                </OpenCloseContainer>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
