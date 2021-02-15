import React from "react";
import MainContainer from "../../../components/UI/containers/MainContainer";
import Sidebar from "../../../components/UI/sidebar/Sidebar";
import ClientsContainer from "../../../components/Models/Client/components/ClientsContainer";

export default function ClinicianClients(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={"clinician"} tab="clients" />
                <main className="w-full h-full p-4 space-y-2 overflow-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl font-bold text-gray-700">
                                Clients
                            </div>
                        </div>
                    </div>
                    <div className="py-2">
                        <ClientsContainer
                            owner={"clinician"}
                            clients={props.clients}
                        />
                    </div>
                </main>
            </div>
        </MainContainer>
    );
}
