import React from "react";
import OpenCloseContainerRounded from "../../../UI/dropdowns/OpenCloseContainerRounded";
import GraphMeasureAssessment from "./GraphMeasureAssessment";
import PresentAssessmentResponses from "./PresentAssessmentResponses";
import ReliableChangeStatsContainer from "./ReliableChangeStatsContainer";
import PresentReliableChangeStats from "./ReliableChangeStatsContainer";

export default function PresentMeasureAssessment(props) {
    const { measure, assessments } = props.measureAssessment;
    return (
        <OpenCloseContainerRounded title={measure.name} isOpen={true}>
            <div className="px-1 sm:px-2 pb-2 space-y-2">
                {measure.scales && (
                    <div className="space-y-2">
                        <ReliableChangeStatsContainer
                            measure={measure}
                            assessments={assessments}
                        />
                        <GraphMeasureAssessment
                            measure={measure}
                            assessments={assessments}
                        />
                    </div>
                )}
                <div className="space-y-2 py-2">
                    <div className="text-sm sm:text-base font-semibold text-gray-400">
                        Responses
                    </div>
                    {assessments.map((assessment, index) => {
                        return (
                            <OpenCloseContainerRounded
                                key={index}
                                title={assessment.assessed_at}
                                isOpen={false}
                            >
                                <PresentAssessmentResponses
                                    measure={measure}
                                    responses={assessment.responses}
                                />
                            </OpenCloseContainerRounded>
                        );
                    })}
                </div>
            </div>
        </OpenCloseContainerRounded>
    );
}
