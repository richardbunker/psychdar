import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { returnCurrentDateString } from "../../../utilities/HelperFunctions";
import ButtonBlue from "../../UI/buttons/ButtonBlue";
import Spinner from "../../UI/spinners/Spinner";

export default function Snapshot(props) {
    const [snapped, setSnapped] = useState(false);
    const size = props.iconSize;
    const colour = props.iconColour;

    const takeSnapshot = () => {
        setSnapped(true);
        const values = {
            date: returnCurrentDateString(),
            result: {
                ...props.result
            },
            effectSizeSettings: {
                ...props.effectSizeSettings
            }
        };
        Inertia.post("/user-snapshots", values);
    };
    return (
        <div className="flex items-center justify-between w-full">
            <svg
                className={"w-" + size + " " + "h-" + size + " " + colour}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                />
            </svg>
            <div className="text-gray-600 ml-3 mt-1 flex items-center justify-between w-full">
                <div className="">{props.heading}</div>
                <div className="ml-2 flex">
                    {props.isLoading ? (
                        <Spinner size="20px" />
                    ) : snapped ? (
                        <div className="flex font-semibold bg-orange-400 items-center px-3 rounded text-sm text-white min-w-max-content uppercase py-2 space-x-2">
                            Snapped!
                        </div>
                    ) : (
                        <ButtonBlue
                            handleClick={takeSnapshot}
                            label="Take Snapshot"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
