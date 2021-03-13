import React, { useState } from "react";
import moment from "moment";
import ClientContainer from "../../components/Models/Client/components/ClientContainer";
import Sidebar from "../../components/UI/navs/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import AdsContainer from "../../components/UI/ads/AdsContainer";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";
import MobileNav from "../../components/UI/navs/MobileNav";

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
                <MobileNav tab="clients" />
                <ScrollableScreenContainer>
                    <ClientContainer
                        savedAt={savedAt}
                        onStatusUpdate={onStatusUpdate}
                        client={props.client}
                        userPublishedMeasures={props.userPublishedMeasures}
                    />
                </ScrollableScreenContainer>
                <AdsContainer />
            </div>
        </MainContainer>
    );
}
