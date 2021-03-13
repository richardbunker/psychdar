import React from "react";
import Sidebar from "../../components/UI/navs/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import ScrollableScreenContainer from "../../components/UI/containers/ScrollableScreenContainer";
import StructureEditor from "../../components/Models/Measure/components/Structure/StructureEditor";
import MobileNav from "../../components/UI/navs/MobileNav";

export default function EditMeasure(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar tab="measures" />
                <MobileNav tab="measures" />
                <ScrollableScreenContainer>
                    <StructureEditor measure={props.measure} />
                </ScrollableScreenContainer>
            </div>
        </MainContainer>
    );
}
