import React from "react";
import { sum } from "../../../Stats/Stats";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";
import CliniciansRow from "../../../Stats/row/Clinicians";
import ClientsRow from "../../../Stats/row/Clients";
import TreatmentEpisodesRow from "../../../Stats/row/TreatmentEpisodes";
import TotalConsultationsRow from "../../../Stats/row/TotalConsultations";
import TotoalAssessmentsRow from "../../../Stats/row/TotalAssessments";

export default function ClinicStats(props) {
    const clientCount = props.clinic.clinicians
        .map(clinician => {
            return clinician.clients.length;
        })
        .reduce(sum, 0);

    const treatmentCount = props.clinic.clinicians
        .flatMap(clinician => {
            return clinician.clients.map(client => {
                return client.treatments.length;
            });
        })
        .reduce(sum, 0);

    const consultationCount = props.clinic.clinicians
        .flatMap(clinician => {
            return clinician.clients.flatMap(client => {
                return client.treatments.map(treatment => {
                    return treatment.consultation_count;
                });
            });
        })
        .reduce(sum, 0);

    const assessmentCount = props.clinic.clinicians
        .flatMap(clinician => {
            return clinician.clients.flatMap(client => {
                return client.treatments.map(treatment => {
                    return treatment.assessments.length;
                });
            });
        })
        .reduce(sum, 0);

    return (
        <div className="text-gray-700">
            <div style={props.width} className="bg-white rounded-b">
                <GrayFadedBanner title={props.clinic.name} />
                <div className="text-base py-4 px-6 space-y-4">
                    <CliniciansRow
                        iconSize="10"
                        iconColour="text-blue-400"
                        number={props.clinic.clinicians.length}
                    />
                    <ClientsRow
                        iconSize="10"
                        iconColour="text-green-400"
                        number={clientCount}
                    />
                    <TreatmentEpisodesRow
                        iconSize="10"
                        iconColour="text-pink-400"
                        number={treatmentCount}
                    />
                    <TotalConsultationsRow
                        iconSize="10"
                        iconColour="text-indigo-400"
                        number={consultationCount}
                    />
                    <TotoalAssessmentsRow
                        iconSize="10"
                        iconColour="text-gray-400"
                        number={assessmentCount}
                    />
                </div>
            </div>
        </div>
    );
}
