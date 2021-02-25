import React from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import StructureBuilder from "../../components/Models/Measure/components/Structure/StructureBuilder";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";

export default function CreateMeasure(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="measures" />
                <ScrollableScreenContainer>
                    <StructureBuilder />
                </ScrollableScreenContainer>
            </div>
        </MainContainer>
    );
}
