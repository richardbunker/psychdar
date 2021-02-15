import React, { useState, useEffect } from "react";
import TreatmentEpisodesRow from "../../../Stats/row/TreatmentEpisodes";

export default function OrganisationClinics(props) {
    const [treatments, setTreatments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                "/api/dashboard/organisation/" +
                    props.organisationHashedId +
                    "/treatments"
            )
            .then(response => {
                setTreatments(response.data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    }, [props.organisationHashedId]);

    return (
        <TreatmentEpisodesRow
            isLoading={isLoading}
            iconSize="10"
            iconColour="text-pink-400"
            number={treatments.length}
        />
    );
}
