import React, { useState, useEffect } from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import LargeSpinner from "../../components/UI/spinners/LargeSpinner";
import MeasureTileContainer from "../../components/Models/Measure/components/Tiles/MeasureTileContainer";

export default function UserMeasures(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="measures" />
                <div className="w-full h-full p-4 space-y-2 overflow-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl font-bold text-gray-700">
                                Measures
                            </div>
                        </div>
                    </div>
                    <div className="py-2 grid grid-cols-3 gap-2">
                        <MeasureTileContainer measures={props.measures} />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
}
