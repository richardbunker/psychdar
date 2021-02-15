import React from "react";
import Spinner from "../../UI/spinners/Spinner";

export default function TreatmentEpisodesRow(props) {
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
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path>
            </svg>
            <div className="text-gray-600 ml-3 mt-1 flex items-center justify-between w-full">
                <div className=" font-bold w-full">Treatment Episodes</div>
                <div className="ml-2  font-bold">
                    {props.isLoading ? <Spinner size="20px" /> : props.number}
                </div>
            </div>
        </div>
    );
}
