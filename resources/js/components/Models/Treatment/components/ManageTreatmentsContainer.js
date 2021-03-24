import React, { useState } from "react";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import ManageActiveTreatments from "./ManageActiveTreatments";
import ManageEndedTreatments from "./ManageEndedTreatments";

export default function ManageTreatmentsContainer(props) {
    return (
        <div className="space-y-2">
            {props.treatments.map((treatment, index) => {
                return treatment.ended === "Present" ? (
                    <ManageActiveTreatments key={index} treatment={treatment} />
                ) : (
                    <ManageEndedTreatments key={index} treatment={treatment} />
                );
            })}
            <div className="flex items-center justify-end space-x-2 ml-auto pt-2">
                <ButtonGray label="Cancel" handleClick={props.toggle} />
            </div>
        </div>
    );
}
