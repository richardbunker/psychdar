import React from "react";
import ClientsRow from "../../../Stats/row/Clients";
import { sum } from "../../../Stats/Stats";
import TreatmentEpisodesRow from "../../../Stats/row/TreatmentEpisodes";
import TotalConsultationsRow from "../../../Stats/row/TotalConsultations";
import EffectSizeRow from "../../../Stats/row/EffectSize";
import TotalAssessmentsRow from "../../../Stats/row/TotalAssessments";

export default function ClinicianCard(props) {
    const totalConsultations = props.clinician.clients
        .flatMap(client => {
            return client.treatments.map(treatment => {
                return treatment.consultation_count;
            });
        })
        .reduce(sum);

    const totalAssessments = props.clinician.clients
        .flatMap(client => {
            return client.treatments.map(treatment => {
                return treatment.assessments.length;
            });
        })
        .reduce(sum);

    const totalTreatments = props.clinician.clients
        .flatMap(client => {
            return client.treatments.length;
        })
        .reduce(sum);

    return (
        <div className="w-96 space-y-2">
            <a href={"/clinician/" + props.clinician.hashed_id}>
                <div className="py-4 px-8 border border-teal-100 rounded hover:shadow-xl hover:border-teal-300">
                    <div className="text-gray-700 text-xl font-bold">
                        {props.clinician.first_name +
                            " " +
                            props.clinician.last_name}
                    </div>
                    <div className="text-sm py-2 space-y-1">
                        <ClientsRow
                            iconSize="8"
                            iconColour="text-green-400"
                            number={props.clinician.clients.length}
                        />
                        <TreatmentEpisodesRow
                            iconSize="8"
                            iconColour="text-pink-400"
                            number={totalTreatments}
                        />
                        <TotalConsultationsRow
                            iconSize="8"
                            iconColour="text-indigo-400"
                            number={totalConsultations}
                        />
                        <TotalAssessmentsRow
                            iconSize="8"
                            iconColour="text-gray-400"
                            number={totalAssessments}
                        />
                        <EffectSizeRow
                            iconSize="8"
                            iconColour="text-yellow-300"
                            clinician={props.clinician}
                        />
                    </div>
                </div>
            </a>
        </div>
    );
}
