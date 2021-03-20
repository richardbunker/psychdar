import React from "react";
import OpenCloseContainerRounded from "../../../UI/dropdowns/OpenCloseContainerRounded";
import GraphMeasureAssessment from "./GraphMeasureAssessment";
import PresentAssessmentResponses from "./PresentAssessmentResponses";

export default function PresentMeasureAssessment(props) {
    const { measure, assessments } = props.measureAssessment;
    return (
        <div className="px-2 pb-2 space-y-2">
            <div className="bg-white space-y-2">
                <div className="font-semibold text-lg text-gray-500">
                    {measure.name}
                </div>
                {measure.scales && (
                    <GraphMeasureAssessment
                        measure={measure}
                        assessments={assessments}
                    />
                )}
            </div>
            <div className="space-y-2">
                <div className="text-base text-gray-400">Responses</div>
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
    );
}
