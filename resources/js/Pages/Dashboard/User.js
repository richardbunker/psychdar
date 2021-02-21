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
                <main className="w-full overflow-auto h-full border-t-4 border-teal-400">
                    <div className="h-screen min-h-screen overflow-auto w-full">
                        <UserStats user={props.user} />
                    </div>
                </main>
                <AdsContainer />
            </div>
        </MainContainer>
    );
}
