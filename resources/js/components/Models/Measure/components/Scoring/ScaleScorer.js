import React, { useEffect } from "react";

export default function ScaleScorer(props) {
    const calculateScaleScore = () => {
        let totalScore = 0;
        props.scale.items.map(scaleItem => {
            if (Object.keys(props.responses).includes(String(scaleItem))) {
                totalScore += props.responses[scaleItem];
            }
        });
        if (props.scale.operation === "Mean") {
            return (totalScore / Object.keys(props.responses).length).toFixed(
                2
            );
        } else {
            return totalScore;
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="text-teal-300">{props.scale.title}</div>
            <div className="text-blue-400">
                {isNaN(calculateScaleScore()) ? 0 : calculateScaleScore()}
            </div>
        </div>
    );
}
