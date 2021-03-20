import React from "react";
import LineChart from "../../../Chartjs/LineChart";
import { calculateScaleScore } from "../utilities/ScaleScoring";

export default function GraphMeasureAssessment(props) {
    const colours = [
        "#4FD1C5",
        "#63B3ED",
        "#F687B3",
        "#F6AD55",
        "#F6E05E",
        "#68D391",
        "#B794F4"
    ];
    const cycleColour = index => {
        return index > 6 ? index % 7 : index;
    };
    const scaleScores = props.measure.scales.map((scale, index) => {
        return {
            label: scale.title,
            data: props.assessments.map(assessment => {
                return calculateScaleScore(scale, assessment.responses);
            }),
            fill: false,
            borderWidth: 3,
            borderColor: colours[cycleColour(index)],
            backgroundColor: colours[cycleColour(index)],
            pointRadius: 3,
            lineTension: 0.4
        };
    });
    const dates = props.assessments.map(assessment => {
        return assessment.assessed_at;
    });
    return (
        props.measure.scales.length > 0 && (
            <LineChart labels={dates} scaleScores={scaleScores} />
        )
    );
}
