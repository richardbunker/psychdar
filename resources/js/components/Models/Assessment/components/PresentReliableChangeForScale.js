import React from "react";
import {
    reliableChangeIndex,
    standardErrorOfDifference,
    standardErrorOfMeasurement,
    stdDev
} from "../../../Stats/Stats";
import { calculateScaleScore } from "../utilities/ScaleScoring";

export default function PresentReliableChangeForScale({ assessments, scale }) {
    const scaleScores = assessments.map(assessment => {
        return calculateScaleScore(scale, assessment.responses);
    });
    const alpha = Number(scale.alpha);
    const initialScore = scaleScores[0];
    const mostRecentScore = scaleScores[scaleScores.length - 1];
    const differencScore = mostRecentScore - initialScore;
    const rci = reliableChangeIndex(
        initialScore,
        mostRecentScore,
        standardErrorOfDifference(
            standardErrorOfMeasurement(stdDev(scaleScores), alpha)
        )
    );
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
                <div className="text-gray-500">{Math.abs(differencScore)}</div>
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
