import React from "react";
import Spinner from "../../UI/spinners/Spinner";

export default function ClinicsRow(props) {
    const size = props.iconSize;
    const colour = props.iconColour;
    return (
        <div className="flex items-center justify-between w-full">
            <svg
                className={"w-" + size + " " + "h-" + size + " " + colour}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <div className="text-gray-600 ml-3 mt-1 flex items-center justify-between w-full">
                <div className=" font-bold w-full">Clinics</div>
                <div className="ml-2  font-bold">
                    {props.isLoading ? <Spinner size="20px" /> : props.number}
                </div>
            </div>
        </div>
    );
}
