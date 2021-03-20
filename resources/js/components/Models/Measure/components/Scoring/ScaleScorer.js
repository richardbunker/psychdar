import React from "react";
import { calculateScaleScore } from "../../../Assessment/utilities/ScaleScoring";

export default function ScaleScorer(props) {
    const calculateCuttOff = scaleScore => {
        return props.scale.cuttOffs.map(cuttOff => {
            if (scaleScore >= cuttOff.min && scaleScore <= cuttOff.max) {
                return '"' + cuttOff.label + '"';
            }
        });
    };

    const calculate = () => {
        return isNaN(calculateScaleScore(props.scale, props.responses))
            ? 0
            : calculateScaleScore(props.scale, props.responses);
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
