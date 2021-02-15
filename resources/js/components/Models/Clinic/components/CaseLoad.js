import React from "react";
import LineChart from "../../../Chartjs/LineChart";

export default function CaseLoad(props) {
    const coloursCyan = [
        "#CFFAFE",
        "#A5F3FC",
        "#67E8F9",
        "#22D3EE",
        "#06B6D4",
        "#0891B2"
    ];

    return (
        <div style={props.width} className="bg-white rounded p-2">
            <div className="w-full text-base font-semibold text-gray-400 uppercase">
                Case Load
            </div>
            <div>
                <LineChart
                    colours={coloursCyan}
                    label={"Case Load"}
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
