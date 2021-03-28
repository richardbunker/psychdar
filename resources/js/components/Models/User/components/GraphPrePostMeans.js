import React from "react";
import BarChart from "../../../Chartjs/BarChart";

export default function GraphPrePostMeans(props) {
    const colours = [
        "#4FD1C5",
        "#63B3ED",
        "#F687B3",
        "#F6AD55",
        "#F6E05E",
        "#68D391",
        "#B794F4"
    ];
    return (
        <div className="bg-white py-2 space-y-2">
            <div className="font-semibold text-lg text-gray-500">
                {props.effectSizeData.name + " Data"}
            </div>
            <BarChart
                labels={["Pre-Treatment", "Post-Treatment"]}
                label={"Group Mean"}
                data={props.means}
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
