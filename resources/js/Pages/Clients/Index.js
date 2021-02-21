import React, { useState, useEffect } from "react";
import MainContainer from "../../components/UI/containers/MainContainer";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import ClientsContainer from "../../components/Models/Client/components/ClientsContainer";
import LargeSpinner from "../../components/UI/spinners/LargeSpinner";
import AdsContainer from "../../components/UI/ads/AdsContainer";

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
                <Sidebar tab="clients" />
                <main className="h-screen min-h-screen overflow-auto w-full border-t-4 border-teal-400">
                    <ClientsContainer clients={props.userClients} />
                </main>
                <AdsContainer />
            </div>
        </MainContainer>
    );
}
