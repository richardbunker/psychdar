import React from "react";
import OpenCloseContainerRounded from "../../../UI/dropdowns/OpenCloseContainerRounded";
import PresentReliableChangeForScale from "./PresentReliableChangeForScale";

export default function ReliableChangeStatsContainer({ measure, assessments }) {
    const scalesWithAnAlpha = measure.scales
        .map(scale => {
            if (scale.alpha !== null) {
                return scale;
            }
        })
        .filter(item => item !== undefined);
    return (
        scalesWithAnAlpha.length > 0 && (
            <OpenCloseContainerRounded
                title={"Reliable Change Statistics"}
                isOpen={true}
            >
                <div className="space-y-1">
                    {scalesWithAnAlpha.map((scale, index) => {
                        return (
                            <PresentReliableChangeForScale
                                scale={scale}
                                key={index}
                                assessments={assessments}
                            />
                        );
                    })}
                </div>
            </OpenCloseContainerRounded>
        )
    );
}
