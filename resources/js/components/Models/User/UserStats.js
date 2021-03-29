import React, { useState } from "react";
import GrayFadedMenuBanner from "../../UI/GrayFadedMenuBanner";
import ButtonBlue from "../../UI/buttons/ButtonBlue";
import { sum } from "../../Stats/Stats";
import ClientsRow from "../../Stats/row/Clients";
import TreatmentEpisodesRow from "../../Stats/row/TreatmentEpisodes";
import TotalAssessmentsRow from "../../Stats/row/TotalAssessments";
import ModalScrollable from "../../UI/modals/Scrollable";
import EffectSizeContainer from "./components/EffectSizeContainer";
import EffectSizeCalculationSettings from "./components/EffectSizeCalculationSettings";
import GrayFadedBanner from "../../UI/GrayFadedBanner";
import SnapshotsContainer from "../Snapshot/components/SnapshotsContainer";

export default function UserStats(props) {
    const [displayEffectSizeSettings, setDisplayEffectSizeSettings] = useState(
        false
    );

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
            <div className="w-full bg-white">
                <GrayFadedBanner title={props.user.name} />
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
                        heading="Effect Size Calculation Settings"
                    >
                        <EffectSizeCalculationSettings
                            toggle={toggleEffectSizeSettings}
                            measures={props.user.measures}
                            data={props.user.data ? props.user.data : false}
                        />
                    </ModalScrollable>
                )}
                {props.user.data && (
                    <EffectSizeContainer data={props.user.data} />
                )}
            </div>
            {props.user.snapshots.length > 0 && (
                <SnapshotsContainer snapshots={props.user.snapshots} />
            )}
        </div>
    );
}
