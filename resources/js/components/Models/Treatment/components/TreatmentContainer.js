import Axios from "axios";
import React, { useEffect, useState } from "react";
import PresentMeasureAssessment from "../../Assessment/components/PresentMeasureAssessment";

export default function TreatmentContainer(props) {
    const [
        assessmentsGroupedByMeasure,
        setAssessmentsGroupedByMeasure
    ] = useState({});
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAssessmentsGroupedByMeasure();
    }, []);

    const toggleIsLoading = () => {
        setIsLoading(prevState => !prevState);
    };

    const fetchAssessmentsGroupedByMeasure = () => {
        Axios.get(`/treatment-assessments/` + props.treatmentHashedId).then(
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

    return measureAssessments.map((measureAssessment, index) => {
        return (
            <PresentMeasureAssessment
                key={index}
                measureAssessment={measureAssessment}
            />
        );
    });
}
