import React, { useState } from "react";
import GrayFadedMenuBanner from "../../UI/GrayFadedMenuBanner";
import ButtonBlue from "../../UI/buttons/ButtonBlue";
import EffectSizeRow from "../../Stats/row/EffectSize";
import { sum } from "../../Stats/Stats";
import ClientsRow from "../../Stats/row/Clients";
import TreatmentEpisodesRow from "../../Stats/row/TreatmentEpisodes";
import TotalAssessmentsRow from "../../Stats/row/TotalAssessments";
import MeasureRow from "../../Stats/row/Measure";
import ModalScrollable from "../../UI/modals/Scrollable";
import UserSettings from "./components/UserSettings";

export default function UserStats(props) {
    const [displayUserSettings, setDisplayUserSettings] = useState(false);

    const toggleUserSettings = () => {
        setDisplayUserSettings(prevState => !prevState);
    };

    const totalTreatmentEpisodes = props.user.clients
        .map(client => {
            return client.treatments.length;
        })
        .reduce(sum, 0);

    const totalAssessments = props.user.clients
        .flatMap(client => {
            return client.treatments.map(treatment => {
                return treatment.assessments.length;
            });
        })
        .reduce(sum, 0);

    return (
        <div className="space-y-2">
            {displayUserSettings && (
                <ModalScrollable toggle={toggleUserSettings} heading="Settings">
                    <UserSettings
                        toggle={toggleUserSettings}
                        measures={props.user.measures}
                        data={props.user.data}
                    />
                </ModalScrollable>
            )}
            <div className="w-full bg-white rounded-b">
                <GrayFadedMenuBanner title={props.user.name}>
                    <ButtonBlue
                        label="Settings"
                        handleClick={toggleUserSettings}
                    />
                </GrayFadedMenuBanner>
                <div className="text-lg py-4 px-6 space-y-4">
                    <ClientsRow
                        iconSize="10"
                        iconColour="text-green-400"
                        number={props.user.clients.length}
                    />
                    <TreatmentEpisodesRow
                        iconSize="10"
                        iconColour="text-pink-400"
                        number={totalTreatmentEpisodes}
                    />
                    <TotalAssessmentsRow
                        iconSize="10"
                        iconColour="text-gray-400"
                        number={totalAssessments}
                    />
                    <MeasureRow
                        heading="Effect Size Measure"
                        iconSize="10"
                        iconColour="text-teal-400"
                        title={
                            props.user.data.outcome_data.name +
                            " (" +
                            props.user.data.outcome_data.scale.title +
                            ")"
                        }
                    />
                    <EffectSizeRow
                        iconSize="10"
                        iconColour="text-yellow-300"
                        data={props.user.data}
                    />
                </div>
            </div>
        </div>
    );
}
