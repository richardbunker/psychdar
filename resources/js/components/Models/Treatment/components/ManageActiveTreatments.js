import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import CheckboxInput from "../../../UI/inputs/CheckboxInput";

export default function ManageActiveTreatments(props) {
    const [checked, setIsChecked] = useState(false);
    const [treatmentHashedId, setTreatmentHashedId] = useState({
        treatmentHashedId: ""
    });

    const toggleChecked = hashedTreatmentId => {
        setIsChecked(prevState => !prevState);
        setTreatmentHashedId(prevState => {
            return {
                treatmentHashedId: hashedTreatmentId
            };
        });
    };

    const submitEndTreatment = () => {
        Inertia.post("/end-treatment", treatmentHashedId);
        props.toggle();
    };

    return (
        <div className="space-y-2">
            {props.treatments.map((treatement, index) => {
                return (
                    <div
                        key={index}
                        className="border flex items-start p-4 rounded space-x-2 w-full"
                    >
                        {treatement.ended === "Present" ? (
                            <CheckboxInput
                                key={index}
                                onCheckedInput={() =>
                                    toggleChecked(treatement.hashed_id)
                                }
                                title={treatement.started}
                                label="Completed"
                                value={checked}
                                text="Check to mark this treatment episode as completed."
                            />
                        ) : (
                            <div className="text-gray-600 font-semibold w-1/3">
                                {treatement.started + " - " + treatement.ended}
                            </div>
                        )}
                    </div>
                );
            })}
            <div className="flex items-center justify-end space-x-2 ml-auto pt-2">
                <ButtonGray label="Cancel" handleClick={props.toggle} />
                <ButtonTeal label="Update" handleClick={submitEndTreatment} />
            </div>
        </div>
    );
}
