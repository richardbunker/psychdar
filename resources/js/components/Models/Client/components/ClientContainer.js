import React, { useState } from "react";
import TreatmentEpisodesRow from "../../../Stats/row/TreatmentEpisodes";
import TotalAssessmentsRow from "../../../Stats/row/TotalAssessments";
import { sum } from "../../../Stats/Stats";
import GrayFadedMenuBanner from "../../../UI/GrayFadedMenuBanner";
import ButtonBlue from "../../../UI/buttons/ButtonBlue";
import ModalScrollable from "../../../UI/modals/Scrollable";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";
import ManageActiveTreatments from "../../Treatment/components/ManageActiveTreatments";
import ClientSettings from "./ClientSettings";
import ClientMeasures from "./ClientMeasures";
import TreatmentsContainer from "../../Treatment/components/TreatmentsContainer";
import ManageTreatmentsContainer from "../../Treatment/components/ManageTreatmentsContainer";

export default function ClientContainer(props) {
    const [displayClientSettings, setDisplayClientSettings] = useState(false);
    const [displayTreatmentSettings, setDisplayTreatmentSettings] = useState(
        false
    );

    const toggleDisplayClientSettings = () => {
        setDisplayClientSettings(prevState => !prevState);
    };

    const toggleDisplayTreatmentSettings = () => {
        setDisplayTreatmentSettings(prevState => !prevState);
    };

    return (
        <div className="">
            {displayTreatmentSettings && (
                <ModalScrollable heading="Manage Treatment Episodes">
                    <ManageTreatmentsContainer
                        treatments={props.client.treatments}
                        toggle={toggleDisplayTreatmentSettings}
                    />
                    {/* {props.client.active_treatments.length === 0 ? (
                        <>
                            <div className="leading-normal p-2 text-gray-700 text-lg">
                                There are currently no active treatement
                                episodes to manage. A new treatment episode will
                                automatically be created when a client submits
                                an assessment via their unique public URL.
                            </div>
                            <div className="flex items-center justify-end">
                                <ButtonGray
                                    handleClick={toggleDisplayTreatmentSettings}
                                    label="Cancel"
                                />
                            </div>
                        </>
                    ) : (
                        <ManageActiveTreatments
                            toggle={toggleDisplayTreatmentSettings}
                            treatments={props.client.treatments}
                        />
                    )} */}
                </ModalScrollable>
            )}
            {displayClientSettings && (
                <ModalScrollable heading="Client Settings">
                    <ClientSettings
                        client={props.client}
                        toggleModal={toggleDisplayClientSettings}
                    />
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
                    <ClientMeasures
                        userPublishedMeasures={props.userPublishedMeasures}
                        client={props.client}
                    />
                </div>
                <div className="bg-white">
                    <GrayFadedMenuBanner title="Treatment Episodes">
                        <ButtonBlue
                            handleClick={toggleDisplayTreatmentSettings}
                            label="Manage"
                        />
                    </GrayFadedMenuBanner>
                    <TreatmentsContainer treatments={props.client.treatments} />
                </div>
            </div>
        </div>
    );
}
