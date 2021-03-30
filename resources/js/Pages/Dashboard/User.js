import React from "react";
import Sidebar from "../../components/UI/navs/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import UserStats from "../../components/Models/User/UserStats";
import AdsContainer from "../../components/UI/ads/AdsContainer";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";
import MobileNav from "../../components/UI/navs/MobileNav";

export default function UserDashboard(props) {
    return (
        <MainContainer title={"Welcome " + props.user.name}>
            <Sidebar tab="dashboard" />
            <MobileNav tab="dashboard" />
            <ScrollableScreenContainer>
                <UserStats user={props.user} />
            </ScrollableScreenContainer>
            {/* <AdsContainer /> */}
        </MainContainer>
    );
}
