import React from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";
import StructureEditor from "../../components/Models/Measure/components/Structure/StructureEditor";

export default function EditMeasure(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="measures" />
                <ScrollableScreenContainer>
                    <StructureEditor measure={props.measure} />
                </ScrollableScreenContainer>
            </div>
        </MainContainer>
    );
}
