import React from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import MeasureBuilder from "../../components/Models/Measure/components/Structure/StructureBuilder";

export default function CreateMeasure(props) {
    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={"admin"} tab="measures" />
                <div className="h-screen min-h-screen overflow-auto p-4 w-full -mt-2">
                    <MeasureBuilder organisations={props.organisations} />
                </div>
            </div>
        </MainContainer>
    );
}
