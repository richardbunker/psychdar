import React, { useState } from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import UserStats from "../../components/Models/User/UserStats";
import AdsContainer from "../../components/UI/ads/AdsContainer";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";

export default function UserDashboard(props) {
    // console.log(props.user);
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="dashboard" />
                <ScrollableScreenContainer>
                    <UserStats user={props.user} />
                </ScrollableScreenContainer>
                <AdsContainer />
            </div>
        </MainContainer>
    );
}
