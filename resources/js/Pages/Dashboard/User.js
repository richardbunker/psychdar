import React, { useState } from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import Selector from "../../components/Models/Organisation/Selector";
import OrgStats from "../../components/Models/Organisation/OrgStats";
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
                        <header className="flex items-center justify-start">
                            <div className="text-3xl font-bold text-gray-700">
                                Dashboard
                            </div>
                        </header>
                        <div className="py-4">
                            <UserStats user={props.user} />
                        </div>
                    </div>
                </main>
            </div>
        </MainContainer>
    );
}
