import React from "react";
import GrayFadedBanner from "../../UI/GrayFadedBanner";
import EffectSizeRow from "../../Stats/row/EffectSize";
import { sum } from "../../Stats/Stats";
import ClientsRow from "../../Stats/row/Clients";
import TreatmentEpisodesRow from "../../Stats/row/TreatmentEpisodes";
import TotalAssessmentsRow from "../../Stats/row/TotalAssessments";
import SaveableBanner from "../../UI/SaveableBanner";
import MeasureRow from "../../Stats/row/Measure";

export default function UserStats(props) {
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
            <div className="w-full bg-white rounded-b">
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
                    <MeasureRow
                        heading="Effect Size Measure"
                        iconSize="10"
                        iconColour="text-teal-400"
                        title={"CORE10"}
                    />
                    <EffectSizeRow
                        iconSize="10"
                        iconColour="text-yellow-400"
                        clinician={props.user}
                    />
                </div>
            </div>
            <div className="w-full bg-white">
                <SaveableBanner title="Settings" />
                <div className="text-lg text-gray-600 pt-2 pb-6 px-6 space-y-4">
                    <div>Outcome Measure</div>
                </div>
            </div>
        </div>
    );
}
