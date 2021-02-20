import React, { useState } from "react";
import moment from "moment";
import ClientContainer from "../../components/Models/Client/components/ClientContainer";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";

export default function UserClient(props) {
    const [savedAt, setSavedAt] = useState();

    const getTimeStamp = () => {
        return "Saved at " + moment().format("h:mm:ss a");
    };

    const onStatusUpdate = (toUpdate, newStatus) => {
        axios
            .post(
                "/api/client-" + toUpdate + "-status/" + props.client.hashed_id,
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
                <Sidebar tab="clients" />
                <main className="w-full h-full p-4 overflow-auto">
                    <ClientContainer
                        savedAt={savedAt}
                        onStatusUpdate={onStatusUpdate}
                        client={props.client}
                        userMeasures={props.userMeasures}
                    />
                </main>
            </div>
        </MainContainer>
    );
}
