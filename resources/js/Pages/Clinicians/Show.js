import React from "react";
import ClinicianContainer from "../../components/Models/Clinician/components/ClinicianContainer";
import MainContainer from "../../components/UI/containers/MainContainer";
import Sidebar from "../../components/UI/sidebar/Sidebar";

export default function UserClinician(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={props.role} tab="clinicians" />
                <main className="w-full h-full p-4 overflow-auto">
                    <ClinicianContainer
                        owner={props.role}
                        clinician={props.clinician}
                    />
                </main>
            </div>
        </MainContainer>
    );
}
