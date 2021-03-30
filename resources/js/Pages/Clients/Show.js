import React, { useState } from "react";
import ClientContainer from "../../components/Models/Client/components/ClientContainer";
import Sidebar from "../../components/UI/navs/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import AdsContainer from "../../components/UI/ads/AdsContainer";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";
import MobileNav from "../../components/UI/navs/MobileNav";

export default function UserClient(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="clients" />
                <MobileNav tab="clients" />
                <ScrollableScreenContainer>
                    <ClientContainer
                        client={props.client}
                        userPublishedMeasures={props.userPublishedMeasures}
                    />
                </ScrollableScreenContainer>
                {/* <AdsContainer /> */}
            </div>
        </MainContainer>
    );
}
