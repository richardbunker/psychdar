import React, { useState, useEffect } from "react";
import CliniciansRow from "../../../Stats/row/Clinicians";

export default function OrganisationClinics(props) {
    const [clinicians, setClinicians] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                "/api/dashboard/organisation/" +
                    props.organisationHashedId +
                    "/clinicians"
            )
            .then(response => {
                setClinicians(response.data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    }, [props.organisationHashedId]);

    return (
        <CliniciansRow
            isLoading={isLoading}
            iconSize="10"
            iconColour="text-blue-400"
            number={clinicians.length}
        />
    );
}
