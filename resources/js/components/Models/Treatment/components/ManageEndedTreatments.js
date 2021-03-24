import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import CheckboxInput from "../../../UI/inputs/CheckboxInput";

export default function ManageEndedTreatments(props) {
    const [checked, setIsChecked] = useState(props.treatment.included_in_stats);
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
        Inertia.post("/update-ended-treatment", treatmentHashedId);
        props.toggle();
    };

    return (
        <div className="border flex items-start p-4 rounded space-x-2 w-full">
            <CheckboxInput
                onCheckedInput={() => toggleChecked(props.treatment.hashed_id)}
                title={props.treatment.started + " - " + props.treatment.ended}
                label="Included in outcome statistics"
                value={checked}
                text="Uncheck to exclude this treatment episode from statistical outcome analysis."
            />
        </div>
    );
}
