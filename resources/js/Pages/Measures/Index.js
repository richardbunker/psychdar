import React, { useState, useEffect } from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import LargeSpinner from "../../components/UI/spinners/LargeSpinner";
import MeasureTileContainer from "../../components/Models/Measure/components/Tiles/MeasureTileContainer";
import AdsContainer from "../../components/UI/ads/AdsContainer";
import GrayFadedBanner from "../../components/UI/GrayFadedBanner";

export default function UserMeasures(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="measures" />
                <main className="h-screen min-h-screen overflow-auto w-full border-t-4 border-teal-400">
                    <GrayFadedBanner title="Measures" />
                    <MeasureTileContainer measures={props.measures} />
                </main>
                <AdsContainer />
            </div>
        </MainContainer>
    );
}
