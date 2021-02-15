import React, { useState, useEffect } from "react";
import ClinicsRow from "../../../Stats/row/Clinics";

export default function OrganisationClinics(props) {
    const [clinics, setClinics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                "/api/dashboard/organisation/" +
                    props.organisationHashedId +
                    "/clinics"
            )
            .then(response => {
                setClinics(response.data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    }, [props.organisationHashedId]);

    return (
        <ClinicsRow
            isLoading={isLoading}
            iconSize="10"
            iconColour="text-teal-400"
            number={clinics.length}
        />
    );
}
