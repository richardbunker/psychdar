import React, { useState } from "react";
import GrayFadedMenuBanner from "../../UI/GrayFadedMenuBanner";
import ButtonBlue from "../../UI/buttons/ButtonBlue";
import { sum } from "../../Stats/Stats";
import ClientsRow from "../../Stats/row/Clients";
import TreatmentEpisodesRow from "../../Stats/row/TreatmentEpisodes";
import TotalAssessmentsRow from "../../Stats/row/TotalAssessments";
import ModalScrollable from "../../UI/modals/Scrollable";
import UserSettings from "./components/UserSettings";
import EffectSizeContainer from "./components/EffectSizeContainer";
import ChangeEffectSizeMeasure from "./components/ChangeEffectSizeMeasure";

export default function UserStats(props) {
    const [displayUserSettings, setDisplayUserSettings] = useState(false);
    const [displayEffectSizeSettings, setDisplayEffectSizeSettings] = useState(
        false
    );

    const toggleUserSettings = () => {
        setDisplayUserSettings(prevState => !prevState);
    };

    const toggleEffectSizeSettings = () => {
        setDisplayEffectSizeSettings(prevState => !prevState);
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
            <div className="w-full bg-white">
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
                </div>
            </div>
            <div className="bg-white w-full">
                <GrayFadedMenuBanner title="Effect Size">
                    <ButtonBlue
                        label="Settings"
                        handleClick={toggleEffectSizeSettings}
                    />
                </GrayFadedMenuBanner>
                {displayEffectSizeSettings && (
                    <ModalScrollable
                        toggle={toggleEffectSizeSettings}
                        heading="Change Effect Size Measure"
                    >
                        <ChangeEffectSizeMeasure
                            toggle={toggleEffectSizeSettings}
                            measures={props.user.measures}
                            data={props.user.data}
                        />
                    </ModalScrollable>
                )}
                <EffectSizeContainer user={props.user} />
            </div>
        </div>
    );
}
