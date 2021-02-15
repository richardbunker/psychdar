import React from "react";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";
import ClientsRow from "../../../Stats/row/Clients";
import TreatmentEpisodesRow from "../../../Stats/row/TreatmentEpisodes";
import TotalConsultationsRow from "../../../Stats/row/TotalConsultations";
import TotalAssessmentsRow from "../../../Stats/row/TotalAssessments";
import EffectSizeRow from "../../../Stats/row/EffectSize";
import HorizontalScroller from "../../../UI/HorizontalScroller";
import { spinnerBootUp } from "../../../UI/spinners/SpinnerBootUp";
import ClinicianConsultationSpreadPerTreatmentEpisode from "./ClinicianConsultationSpreadPerTreatmentEpisode";
import ClinicianConsultationSpreadPerClient from "./ClinicianConsultationSpreadPerClient";
import ClinicianMedianMeanPerTreatmentEpisode from "./ClinicianMedianMeanPerTreatmentEpisode";
import ClinicianMedianMeanPerClient from "./ClinicianMedianMeanPerClient";
import ClinicianClientsContainer from "./ClinicianClientsContainer";
import { sum } from "../../../Stats/Stats";
import SaveableBanner from "../../../UI/SaveableBanner";
import MeasureRow from "../../../Stats/row/Measure";

export default function ClinicianContainer(props) {
    const totalTreatmentEpisodes = props.clinician.clients
        .map(client => {
            return client.treatments.length;
        })
        .reduce(sum, 0);

    const totalConsultations = props.clinician.clients
        .flatMap(client => {
            return client.treatments.map(treatment => {
                return treatment.consultation_count;
            });
        })
        .reduce(sum, 0);

    const totalAssessments = props.clinician.clients
        .flatMap(client => {
            return client.treatments.map(treatment => {
                return treatment.assessments.length;
            });
        })
        .reduce(sum, 0);

    // console.log(props.owner)

    return props.owner ? (
        <div className="space-y-2">
            <div className="w-full bg-white rounded-b">
                <GrayFadedBanner
                    title={
                        props.clinician.first_name +
                        " " +
                        props.clinician.last_name
                    }
                />
                <div className="text-base py-4 px-6 space-y-4">
                    <ClientsRow
                        iconSize="10"
                        iconColour="text-green-400"
                        number={props.clinician.clients.length}
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
                    {props.owner === "admin" && (
                        <>
                            <MeasureRow
                                heading="Effect Size Measure"
                                iconSize="10"
                                iconColour="text-teal-400"
                                title={"CORE10"}
                            />
                            <EffectSizeRow
                                iconSize="10"
                                iconColour="text-yellow-400"
                                clinician={props.clinician}
                            />
                        </>
                    )}
                </div>
            </div>
            {props.owner === "admin" && (
                <div className="w-full bg-white rounded-b">
                    <SaveableBanner title="Clinician Settings" />
                    <div className="text-base pt-2 pb-6 px-6 space-y-4">
                        <div>Login Access</div>
                        <div>Outcome Measure</div>
                    </div>
                </div>
            )}
            <div className="bg-teal-100 rounded">
                <HorizontalScroller>
                    <ClinicianConsultationSpreadPerTreatmentEpisode
                        width={{ width: "900px" }}
                        clinician={props.clinician}
                    />
                    <ClinicianConsultationSpreadPerClient
                        width={{ width: "900px" }}
                        clinician={props.clinician}
                    />
                </HorizontalScroller>
            </div>
            <div className="bg-teal-100 rounded">
                <HorizontalScroller>
                    <ClinicianMedianMeanPerTreatmentEpisode
                        width={{ width: "900px" }}
                        clinician={props.clinician}
                    />
                    <ClinicianMedianMeanPerClient
                        width={{ width: "900px" }}
                        clinician={props.clinician}
                    />
                </HorizontalScroller>
            </div>
            <ClinicianClientsContainer
                owner={props.owner}
                clients={props.clinician.clients}
            />
        </div>
    ) : (
        spinnerBootUp()
    );
}
