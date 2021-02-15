import React, { useState, useEffect } from "react";
import MainContainer from "../../components/UI/containers/MainContainer";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import SelectOrganisation from "../../components/Models/Organisation/Selector";
import ClientsContainer from "../../components/Models/Client/components/ClientsContainer";
import LargeSpinner from "../../components/UI/spinners/LargeSpinner";

export default function UserClients(props) {
    const [organisation, setOrganisation] = useState([]);
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = event => {
        changeOrganisation(
            props.organisations.find(org => org.hashed_id == event.target.value)
        );
    };

    const changeOrganisation = organisation => {
        setOrganisation(organisation);
        fetchClients(organisation.hashed_id);
    };

    const fetchClients = orgHashedId => {
        setIsLoading(true);
        axios
            .get("/api/organisation/" + orgHashedId + "/clients")
            .then(response => {
                setClients(response.data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        setOrganisation(props.organisations[0]);
        fetchClients(props.organisations[0].hashed_id);
    }, []);

    const showSpinner = () => {
        return (
            <div className="flex items-center justify-center pt-52">
                <LargeSpinner size="100px" />
            </div>
        );
    };

    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={"admin"} tab="clients" />
                <main className="w-full h-full p-4 space-y-2 overflow-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl font-bold text-gray-700">
                                Clients
                            </div>
                        </div>
                        <SelectOrganisation
                            handleChange={handleChange}
                            organisations={props.organisations}
                        />
                    </div>
                    <div className="py-2">
                        {isLoading ? (
                            showSpinner()
                        ) : (
                            <ClientsContainer
                                owner={"admin"}
                                clients={clients}
                            />
                        )}
                    </div>
                </main>
            </div>
        </MainContainer>
    );
}
