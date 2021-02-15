import React, { useState, useEffect } from "react";
import ConsultationsRow from "../../../Stats/row/TotalConsultations";

export default function OrganisationClinics(props) {
    const [consultationsTotal, setConsultationsTotal] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                "/api/dashboard/organisation/" +
                    props.organisationHashedId +
                    "/consultations"
            )
            .then(response => {
                setConsultationsTotal(response.data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    }, [props.organisationHashedId]);

    return (
        <ConsultationsRow
            isLoading={isLoading}
            iconSize="10"
            iconColour="text-indigo-400"
            number={consultationsTotal}
        />
    );
}
