import React from "react";
import MainContainer from "../../../components/UI/containers/MainContainer";
import ClinicianContainer from "../../../components/Models/Clinician/components/ClinicianContainer";
import Sidebar from "../../../components/UI/sidebar/Sidebar";

export default function ClinicianDashboard(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={"clinician"} tab="dashboard" />
                <main className="w-full h-full p-4 space-y-2 overflow-auto">
                    <ClinicianContainer
                        owner={props.clinician.role}
                        clinician={props.clinician}
                    />
                </main>
            </div>
        </MainContainer>
    );
}
