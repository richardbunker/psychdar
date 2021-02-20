import React, { useState, useEffect } from "react";
import MainContainer from "../../components/UI/containers/MainContainer";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import ClientsContainer from "../../components/Models/Client/components/ClientsContainer";
import LargeSpinner from "../../components/UI/spinners/LargeSpinner";

export default function UserClients(props) {
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
                    <ClientsContainer clients={props.userClients} />
                </main>
            </div>
        </MainContainer>
    );
}
