import React from "react";
import MainContainer from "../../components/UI/containers/MainContainer";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import ClinicContainer from "../../components/Models/Clinic/components/ClinicContainer";

export default function Clinic(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={"admin"} tab="clinics" />
                <main className="w-full h-full p-4 overflow-auto">
                    <ClinicContainer clinic={props.clinic} />
                </main>
            </div>
        </MainContainer>
    );
}
