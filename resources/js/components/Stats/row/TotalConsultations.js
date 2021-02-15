import React from "react";
import Spinner from "../../UI/spinners/Spinner";

export default function TotalConsultationsRow(props) {
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
                <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                ></path>
            </svg>
            <div className="text-gray-600 ml-3 mt-1 flex items-center justify-between w-full">
                <div className=" font-bold w-full">Total Consultations</div>
                <div className="ml-2  font-bold">
                    {props.isLoading ? <Spinner size="20px" /> : props.number}
                </div>
            </div>
        </div>
    );
}
