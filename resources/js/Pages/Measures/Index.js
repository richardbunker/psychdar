import React, { useState, useEffect } from "react";
import Sidebar from "../../components/UI/navs/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import MeasureTileContainer from "../../components/Models/Measure/components/Tiles/MeasureTileContainer";
import AdsContainer from "../../components/UI/ads/AdsContainer";
import GrayFadedBanner from "../../components/UI/GrayFadedBanner";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";
import MobileNav from "../../components/UI/navs/MobileNav";
import SearchPublicMeasures from "../../components/Models/Measure/components/Public/SearchPublicMeasures";

export default function UserMeasures(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="measures" />
                <MobileNav tab="measures" />
                <ScrollableScreenContainer>
                    <SearchPublicMeasures />
                    <GrayFadedBanner title="My Measures" />
                    <MeasureTileContainer measures={props.measures} />
                </ScrollableScreenContainer>
                {/* <AdsContainer /> */}
            </div>
        </MainContainer>
    );
}
