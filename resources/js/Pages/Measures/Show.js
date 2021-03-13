import React from "react";
import Sidebar from "../../components/UI/navs/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import MeasureContainer from "../../components/Models/Measure/components/MeasureContainer";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";
import MobileNav from "../../components/UI/navs/MobileNav";

export default function ShowMeasure(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="measures" />
                <MobileNav tab="measures" />
                <ScrollableScreenContainer>
                    <MeasureContainer measure={props.measure} />
                </ScrollableScreenContainer>
            </div>
        </MainContainer>
    );
}
