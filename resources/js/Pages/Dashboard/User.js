import React, { useState } from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import UserStats from "../../components/Models/User/UserStats";

export default function UserDashboard(props) {
    // console.log(props.user);
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="dashboard" />
                <main className="w-full overflow-auto h-full">
                    <div className="flex flex-col p-4">
                        <UserStats user={props.user} />
                    </div>
                </main>
            </div>
        </MainContainer>
    );
}
