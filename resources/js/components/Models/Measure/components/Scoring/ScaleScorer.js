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

    const calculateCuttOff = scaleScore => {
        return props.scale.cuttOffs.map(cuttOff => {
            if (scaleScore >= cuttOff.min && scaleScore <= cuttOff.max) {
                return '"' + cuttOff.label + '"';
            }
        });
    };

    const calculate = () => {
        return isNaN(calculateScaleScore()) ? 0 : calculateScaleScore();
    };

    return (
        <div>
            <div className="flex items-center justify-between font-semibold">
                <div className="text-teal-300">{props.scale.title}</div>
                <div className="flex items-center space-x-2">
                    {props.scale.cuttOffs && (
                        <div className="text-gray-300">
                            {calculateCuttOff(calculate())}
                        </div>
                    )}
                    <div className="text-blue-400">{calculate()}</div>
                </div>
            </div>
        </div>
    );
}
