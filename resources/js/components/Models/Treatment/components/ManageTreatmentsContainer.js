import React, { useState } from "react";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import ManageActiveTreatments from "./ManageActiveTreatments";
import ManageEndedTreatments from "./ManageEndedTreatments";

export default function ManageTreatmentsContainer(props) {
    return (
        <div className="space-y-2">
            {!props.activeTreatments && (
                <div className="border leading-normal p-4 rounded text-base text-gray-500">
                    There are currently no active treatement episodes to manage.
                    A new treatment episode will automatically be created when a
                    client submits an assessment via a measure's unique URL
                    link.
                </div>
            )}
            {props.treatments.map((treatment, index) => {
                return treatment.ended === "Present" ? (
                    <ManageActiveTreatments
                        toggle={props.toggle}
                        key={index}
                        treatment={treatment}
                    />
                ) : (
                    <ManageEndedTreatments
                        toggle={props.toggle}
                        key={index}
                        index={index}
                        activeTreatments={props.activeTreatments}
                        treatment={treatment}
                    />
                );
            })}
            <div className="flex items-center justify-end space-x-2 ml-auto">
                <ButtonGray label="Cancel" handleClick={props.toggle} />
            </div>
        </div>
    );
}
