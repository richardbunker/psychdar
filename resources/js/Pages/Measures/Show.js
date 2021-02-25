import React from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import MeasureContainer from "../../components/Models/Measure/components/MeasureContainer";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";

export default function ShowMeasure(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={"admin"} tab="measures" />
                <ScrollableScreenContainer>
                    <MeasureContainer measure={props.measure} />
                </ScrollableScreenContainer>
            </div>
        </MainContainer>
    );
}
