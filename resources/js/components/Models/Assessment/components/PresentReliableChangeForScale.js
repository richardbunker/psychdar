import React from "react";
import {
    reliableChangeIndex,
    standardErrorOfDifference,
    standardErrorOfMeasurement,
    stdDev
} from "../../../Stats/Stats";
import {
    calculateScaleScore,
    returnScaleResponses
} from "../utilities/ScaleScoring";

export default function PresentReliableChangeForScale({ assessments, scale }) {
    const scaleScores = assessments.map(assessment => {
        return calculateScaleScore(scale, assessment.responses);
    });
    const s1 = returnScaleResponses(scale, assessments[0]["responses"]);
    const s2 = returnScaleResponses(scale, assessments[1]["responses"]);
    const alpha = parseFloat(scale.alpha);
    const initialScore = scaleScores[0];
    const mostRecentScore = scaleScores[scaleScores.length - 1];
    const differencScore = mostRecentScore - initialScore;
    const rci = reliableChangeIndex(
        initialScore,
        mostRecentScore,
        standardErrorOfDifference(
            standardErrorOfMeasurement(0.75, alpha)
            // standardErrorOfMeasurement(stdDev(s1), alpha)
        )
    );
    console.log(scaleScores);
    console.log(differencScore);
    console.log(stdDev(s1), 0.75);
    console.log(rci);
    return (
        <div className="leading-normal p-2 space-y-1 text-sm border-t">
            <div className="font-semibold text-gray-400 text-base">
                {scale.title}
            </div>
            <div className="flex items-center justify-between">
                <div className="text-gray-500">Most Recent Score</div>
                <div className="text-gray-500">{mostRecentScore}</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-gray-500">Initial Score</div>
                <div className="text-gray-500">{initialScore}</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-gray-500">Difference</div>
                <div className="text-gray-500">
                    {Math.abs(differencScore).toFixed(2)}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-gray-500">Reliable Change Index</div>
                <div className="text-gray-500">{rci.toFixed(2)}</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-gray-500 font-semibold">
                    Change From Initial Score
                </div>
                {Math.abs(rci) > 1.96 ? (
                    <div>
                        <div className="bg-green-400 text-white py-1 px-2 rounded font-semibold text-sm">
                            Reliable
                        </div>
                        <div className="text-xs text-gray-400 text-right italic">
                            {"p < .05"}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="bg-gray-400 text-white py-1 px-2 rounded font-semibold text-sm">
                            Non-Reliable
                        </div>
                        <div className="text-xs text-gray-400 text-right italic">
                            {"p > .05"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
