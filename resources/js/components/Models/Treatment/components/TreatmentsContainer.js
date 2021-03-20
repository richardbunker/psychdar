import React from "react";
import OpenCloseContainer from "../../../UI/dropdowns/OpenCloseContainer";
import TreatmentContainer from "./TreatmentContainer";

export default function TreatmentsContainer(props) {
    return (
        <div className="bg-gray-100 space-y-2">
            {props.treatments.map((treatment, index) => {
                return (
                    <OpenCloseContainer
                        key={index}
                        title={treatment.started + " - " + treatment.ended}
                    >
                        <TreatmentContainer
                            treatmentHashedId={treatment.hashed_id}
                        />
                    </OpenCloseContainer>
                );
            })}
        </div>
    );
}
