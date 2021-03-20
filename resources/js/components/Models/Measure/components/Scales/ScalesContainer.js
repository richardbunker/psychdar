import React from "react";
import ScaleScorer from "../Scoring/ScaleScorer";

export default function ScalesContainer({ responses, measure }) {
    return (
        <div className="py-4 px-6 bg-gray-800 text-lg space-y-4">
            <div className="flex font-semibold items-center justify-between text-gray-200">
                <div>Scales</div>
                <div>{measure.scales ? measure.scales.length : "0"}</div>
            </div>
            {measure.scales &&
                measure.scales.map((scale, index) => {
                    return (
                        <ScaleScorer
                            key={index}
                            scale={scale}
                            responses={responses}
                        />
                    );
                })}
        </div>
    );
}
