import React, { useState, useEffect } from "react";
import TotalAssessmentsRow from "../../../Stats/row/TotalAssessments";

export default function OrganisationAssessments(props) {
    const [assessmentsTotal, setAssessmentsTotal] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                "/api/dashboard/organisation/" +
                    props.organisationHashedId +
                    "/assessments"
            )
            .then(response => {
                setAssessmentsTotal(response.data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    }, [props.organisationHashedId]);

    return (
        <TotalAssessmentsRow
            isLoading={isLoading}
            iconSize="10"
            iconColour="text-gray-400"
            number={assessmentsTotal}
        />
    );
}
