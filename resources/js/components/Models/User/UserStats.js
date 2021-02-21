import React from "react";
import GrayFadedBanner from "../../UI/GrayFadedBanner";
import EffectSizeRow from "../../Stats/row/EffectSize";
import HorizontalScroller from "../../UI/HorizontalScroller";
import { sum } from "../../Stats/Stats";
import ClientsRow from "../../Stats/row/Clients";
import TreatmentEpisodesRow from "../../Stats/row/TreatmentEpisodes";
import TotalConsultationsRow from "../../Stats/row/TotalConsultations";
import TotalAssessmentsRow from "../../Stats/row/TotalAssessments";
import SaveableBanner from "../../UI/SaveableBanner";
import MeasureRow from "../../Stats/row/Measure";
import ConsultationSpreadPerTreatmentEpisode from "./components/ConsultationSpreadPerTreatmentEpisode";
import MedianMeanPerClient from "./components/MedianMeanPerClient";
import MedianMeanPerTreatmentEpisode from "./components/MedianMeanPerTreatmentEpisode";
import ConsultationSpreadPerClient from "./components/ConsultationSpreadPerClient";

export default function UserStats(props) {
    const totalTreatmentEpisodes = props.user.clients
        .map(client => {
            return client.treatments.length;
        })
        .reduce(sum, 0);

    const totalConsultations = props.user.clients
        .flatMap(client => {
            return client.treatments.map(treatment => {
                return treatment.consultation_count;
            });
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
                    <TotalConsultationsRow
                        iconSize="10"
                        iconColour="text-indigo-400"
                        number={totalConsultations}
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
            <div className="flex w-full">
                <ConsultationSpreadPerTreatmentEpisode
                    width={{ width: "50%" }}
                    clinician={props.user}
                />
                <ConsultationSpreadPerClient
                    width={{ width: "50%" }}
                    clinician={props.user}
                />
            </div>
            <div className="flex w-full">
                <MedianMeanPerTreatmentEpisode
                    width={{ width: "50%" }}
                    clinician={props.user}
                />
                <MedianMeanPerClient
                    width={{ width: "50%" }}
                    clinician={props.user}
                />
            </div>
        </div>
    );
}
