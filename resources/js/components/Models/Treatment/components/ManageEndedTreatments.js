import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Checkbox from "../../../UI/inputs/Checkbox";
import ButtonBlue from "../../../UI/buttons/ButtonBlue";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";

export default function ManageEndedTreatments(props) {
    const [checked, setIsChecked] = useState(props.treatment.included_in_stats);

    const toggleChecked = hashedTreatmentId => {
        setIsChecked(prevState => !prevState);
    };

    const update = () => {
        const values = {
            hashedTreatmentId: props.treatment.hashed_id,
            includedInStats: checked ? 1 : 0
        };
        Inertia.post("/update-ended-treatment", values);
        props.toggle();
    };

    const reactivate = () => {
        const values = {
            hashedTreatmentId: props.treatment.hashed_id
        };
        Inertia.post("/activate-ended-treatment", values);
        props.toggle();
    };

    return (
        <div className="border p-4 rounded w-full text-sm sm:text-lg">
            <div className="flex flex-col items-start space-y-3 w-full">
                <div className="text-gray-500 flex items-center space-x-2 font-semibold w-full">
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
                        label="Included in outcome statistics"
                        value={checked}
                        disabled={false}
                        checked={checked}
                    />
                    <label className="leading-normal py-2 text-gray-500">
                        Uncheck to exclude this treatment episode from
                        statistical outcome analysis.
                    </label>
                    <div className="flex items-center space-x-2">
                        <ButtonBlue handleClick={update} label="Update" />
                        {!props.activeTreatments && props.index === 0 && (
                            <ButtonTeal
                                handleClick={reactivate}
                                label="Reactivate"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
