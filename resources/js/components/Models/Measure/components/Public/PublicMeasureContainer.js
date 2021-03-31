import React from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonBlue from "../../../../UI/buttons/ButtonBlue";
import LinkGray from "../../../../UI/links/LinkGray";

export default function PublicMeasureContainer(props) {
    const submitAddMeasure = hashedMeasureId => {
        const values = {
            hashedMeasureId: hashedMeasureId
        };
        Inertia.post("/add-measure", values);
        props.toggleModal();
    };
    const row = "p-2 leading-normal";

    return (
        <div
            key={props.publicMeasure.hashed_id}
            className={
                props.index % 2 ? row + " bg-teal-50" : row + " bg-white"
            }
        >
            {props.userMeasureHashedIds.includes(
                props.publicMeasure.hashed_id
            ) ? (
                <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-sm font-semibold">
                        {props.publicMeasure.name}
                    </div>
                    <div className="flex items-center bg-teal-400 px-2 rounded  min-w-max-content py-1 space-x-2">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="uppercase font-semibold text-xs sm:text-sm text-white">
                            Added
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row space-y-2">
                    <div className="text-gray-500 text-sm font-semibold">
                        {props.publicMeasure.name}
                    </div>
                    <div className="flex items-center justify-end space-x-2 w-full">
                        <LinkGray
                            url={
                                "/preview-measure/" +
                                props.publicMeasure.hashed_id
                            }
                            shouldOpenInNewTab={true}
                            label="Preview"
                        />
                        <ButtonBlue
                            handleClick={() =>
                                submitAddMeasure(props.publicMeasure.hashed_id)
                            }
                            label="Add Measure"
                        >
                            <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ButtonBlue>
                    </div>
                </div>
            )}
        </div>
    );
}
