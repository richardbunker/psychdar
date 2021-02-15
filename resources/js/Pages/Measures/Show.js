import React from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import MeasureContainer from "../../components/Models/Measure/components/MeasureContainer";

export default function ShowMeasure(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={"admin"} tab="measures" />
                <div className="h-screen min-h-screen overflow-auto p-4 w-full -mt-2">
                    <MeasureContainer measure={props.measure} />
                </div>
            </div>
        </MainContainer>
    );
}
