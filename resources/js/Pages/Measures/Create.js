import React from "react";
import Sidebar from "../../components/UI/navs/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import StructureBuilder from "../../components/Models/Measure/components/Structure/StructureBuilder";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";
import MobileNav from "../../components/UI/navs/MobileNav";

export default function CreateMeasure(props) {
    return (
        <MainContainer title="Measure | Create">
            <div className="flex w-full">
                <Sidebar tab="measures" />
                <MobileNav tab="measures" />
                <ScrollableScreenContainer>
                    <StructureBuilder />
                </ScrollableScreenContainer>
            </div>
        </MainContainer>
    );
}
