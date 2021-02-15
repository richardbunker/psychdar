import React from "react";
import { median, mean } from "../../../Stats/Stats";
import MixedChart from "../../../Chartjs/MixedChart";

export default function MedianMeanSessionsPerClient(props) {
    const clinicianFirstNames = props.clinicians.map(clinician => {
        return clinician.first_name;
    });

    const medianPerClinician = props.clinicians.map(clinician => {
        const totalPC = clinician.clients.map(client => {
            let total = 0;
            client.treatments.map(treatment => {
                total = total + treatment.consultation_count;
            });
            return total;
        });
        return median(totalPC);
    });

    const meanPerClinician = props.clinicians.map(clinician => {
        const totalPC = clinician.clients.map(client => {
            let total = 0;
            client.treatments.map(treatment => {
                total = total + treatment.consultation_count;
            });
            return total;
        });
        return mean(totalPC).toFixed(2);
    });

    return (
        <div style={props.width} className="bg-white rounded p-2">
            <div className="w-full text-base font-semibold text-gray-400 uppercase">
                Median/Mean Consultations Per Client
            </div>
            <div>
                <MixedChart
                    labels={clinicianFirstNames}
                    dataset1Label={"Median"}
                    dataset1Data={medianPerClinician}
                    dataset1Colour="#EEF2FF"
                    dataset2Label={"Mean"}
                    dataset2Data={meanPerClinician}
                    dataset2Colour="#C7D2FE"
                    dataset2Type="bar"
                />
            </div>
        </div>
    );
}
