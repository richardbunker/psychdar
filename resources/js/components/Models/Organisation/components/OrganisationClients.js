import React, { useState, useEffect } from "react";
import ClientsRow from "../../../Stats/row/Clients";

export default function OrganisationClinics(props) {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                "/api/dashboard/organisation/" +
                    props.organisationHashedId +
                    "/clients"
            )
            .then(response => {
                setClients(response.data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    }, [props.organisationHashedId]);

    return (
        <ClientsRow
            isLoading={isLoading}
            iconSize="10"
            iconColour="text-green-400"
            number={clients.length}
        />
    );
}
