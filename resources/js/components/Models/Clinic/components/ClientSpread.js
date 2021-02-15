import React from "react";
import PieChart from "../../../Chartjs/PieChart";

export default function ClientSpread(props) {
    const coloursTeal = [
        "#CCFBF1",
        "#99F6E4",
        "#5EEAD4",
        "#2DD4BF",
        "#14B8A6",
        "#0D9488"
    ];

    return (
        <div style={props.width} className="bg-white rounded p-2">
            <div className="w-full text-base font-semibold text-gray-400 uppercase">
                Client Spread Per Clinician
            </div>
            <div>
                <PieChart
                    colours={coloursTeal}
                    labels={props.clinicians.map(clinician => {
                        return clinician.first_name;
                    })}
                    data={props.clinicians.map(clinician => {
                        return clinician.clients.length;
                    })}
                />
            </div>
        </div>
    );
}
