import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import CheckboxInput from "../../../UI/inputs/CheckboxInput";
import Checkbox from "../../../UI/inputs/Checkbox";
import ButtonBlue from "../../../UI/buttons/ButtonBlue";
import { prepareCarbonNowDate } from "../utilities/TreatmentFunctions";

export default function ManageActiveTreatments(props) {
    const [checked, setIsChecked] = useState(false);

    const toggleChecked = hashedTreatmentId => {
        setIsChecked(prevState => !prevState);
    };

    const submit = () => {
        const date = new Date();
        const values = {
            hashedTreatmentId: props.treatment.hashed_id,
            endedAt: date.toString()
        };
        Inertia.post("/end-treatment", values);
        props.toggle();
    };

    console.log(prepareCarbonNowDate());

    return (
        <div className="border p-4 rounded w-full">
            <div className="flex flex-col items-start space-y-3 w-full">
                <div className="text-gray-500 flex items-center space-x-2 font-semibold w-full text-lg">
                    <span>{props.treatment.started}</span>
                    <svg
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>{props.treatment.ended}</span>
                </div>
                <div className="w-full flex flex-col items-start justify-start">
                    <Checkbox
                        onCheckboxChange={() =>
                            toggleChecked(props.treatment.hashed_id)
                        }
                        label="Completed"
                        value={checked}
                        disabled={false}
                        checked={checked}
                    />
                    <label className="leading-normal py-2 text-gray-500 text-base">
                        Check to mark this treatment episode as completed.
                    </label>
                    {checked && (
                        <ButtonBlue handleClick={submit} label="Update" />
                    )}
                </div>
            </div>
        </div>
    );
}
