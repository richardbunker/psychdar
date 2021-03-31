import Axios from "axios";
import React, { useEffect, useState } from "react";
import PresentMeasureAssessment from "../../Assessment/components/PresentMeasureAssessment";
import LargeSpinner from "../../../UI/spinners/LargeSpinner";

export default function TreatmentContainer(props) {
    const [
        assessmentsGroupedByMeasure,
        setAssessmentsGroupedByMeasure
    ] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAssessmentsGroupedByMeasure();
    }, []);

    const toggleIsLoading = () => {
        setIsLoading(prevState => !prevState);
    };

    const fetchAssessmentsGroupedByMeasure = () => {
        Axios.get("/treatment-assessments/" + props.treatmentHashedId).then(
            res => {
                setAssessmentsGroupedByMeasure(res.data);
                toggleIsLoading();
            }
        );
    };

    const keys = Object.keys(assessmentsGroupedByMeasure);

    const measureAssessments = keys.map(key => {
        return {
            ...assessmentsGroupedByMeasure[key]
        };
    });

    return isLoading ? (
        <div className="flex items-center justify-center py-20">
            <LargeSpinner size="80px" />
        </div>
    ) : (
        <div className="p-1 sm:p-2 space-y-2">
            {measureAssessments.map((measureAssessment, index) => {
                return (
                    <PresentMeasureAssessment
                        key={index}
                        measureAssessment={measureAssessment}
                    />
                );
            })}
        </div>
    );
}
