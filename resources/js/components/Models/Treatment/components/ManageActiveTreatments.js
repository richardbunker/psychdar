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
        <div
            key={index}
            className="border flex items-start p-4 rounded space-x-2 w-full"
        >
            <CheckboxInput
                onCheckedInput={() => toggleChecked(treatment.hashed_id)}
                title={treatment.started}
                label="Completed"
                value={checked}
                text="Check to mark this treatment episode as completed."
            />
        </div>
    );
}
