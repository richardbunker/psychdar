import React, { useState } from "react";
import moment from "moment";
import Sidebar from "../../../components/UI/sidebar/Sidebar";
import ClientContainer from "../../../components/Models/Client/components/ClientContainer";
import MainContainer from "../../../components/UI/containers/MainContainer";

export default function ClinicianClient(props) {
    const [savedAt, setSavedAt] = useState();

    const getTimeStamp = () => {
        return "Saved at " + moment().format("h:mm:ss a");
    };

    const onStatusUpdate = (toUpdate, newStatus) => {
        axios
            .post(
                "/api/c/client-" +
                    toUpdate +
                    "-status/" +
                    props.client.hashed_id,
                {
                    [toUpdate]: newStatus
                }
            )
            .then(response => {
                setSavedAt(getTimeStamp());
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={"clinician"} tab="clients" />
                <main className="w-full h-full p-4 overflow-auto">
                    <ClientContainer
                        savedAt={savedAt}
                        onStatusUpdate={onStatusUpdate}
                        client={props.client}
                    />
                </main>
            </div>
        </MainContainer>
    );
}
