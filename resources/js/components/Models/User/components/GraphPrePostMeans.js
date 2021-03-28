import React, { useEffect } from "react";
import BarChart from "../../../Chartjs/BarChart";

export default function GraphPrePostMeans(props) {
    const means = [
        props.result.preMean.toFixed(2),
        props.result.postMean.toFixed(2)
    ];
    return (
        <div className="bg-white py-2 space-y-2">
            <div className="font-semibold text-lg text-gray-500">
                {props.effectSizeData.name + " Data"}
            </div>
            <BarChart
                labels={["Pre-Treatment", "Post-Treatment"]}
                label={"Group Mean"}
                data={means}
                colour="#4FD1C5"
                barThickness={"100"}
                yAxisLabel={
                    props.effectSizeData.name +
                    " - " +
                    props.effectSizeData.scale.title
                }
            />
        </div>
    );
}
