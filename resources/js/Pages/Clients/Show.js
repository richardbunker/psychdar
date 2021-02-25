import React, { useState } from "react";
import moment from "moment";
import ClientContainer from "../../components/Models/Client/components/ClientContainer";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import AdsContainer from "../../components/UI/ads/AdsContainer";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";

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
                <ScrollableScreenContainer>
                    <ClientContainer
                        savedAt={savedAt}
                        onStatusUpdate={onStatusUpdate}
                        client={props.client}
                        userMeasures={props.userMeasures}
                    />
                </ScrollableScreenContainer>
                <AdsContainer />
            </div>
        </MainContainer>
    );
}
