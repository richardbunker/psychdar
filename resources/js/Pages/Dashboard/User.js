import React, { useState } from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import UserStats from "../../components/Models/User/UserStats";
import AdsContainer from "../../components/UI/ads/AdsContainer";

export default function UserDashboard(props) {
    // console.log(props.user);
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="dashboard" />
                <main className="w-full overflow-auto h-full">
                    <div className="flex flex-col p-4">
                        <AdsContainer>Ads Container</AdsContainer>
                        <UserStats user={props.user} />
                    </div>
                </main>
            </div>
        </MainContainer>
    );
}