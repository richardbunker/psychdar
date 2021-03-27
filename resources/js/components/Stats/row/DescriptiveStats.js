import React from "react";
import StatsInfo from "../../UI/infoboxes/StatsInfo";
import Spinner from "../../UI/spinners/Spinner";

export default function DescriptiveStats(props) {
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
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                    clipRule="evenodd"
                />
            </svg>
            <div className="text-gray-600 ml-3 mt-1 flex items-center justify-between w-full">
                <div className="w-full">{props.heading}</div>
                <div className="ml-2 flex items-center justify-end w-full text-right">
                    {props.isLoading ? (
                        <Spinner size="20px" />
                    ) : (
                        <div className="flex flex-col space-y-3">
                            {props.notEnoughData ? (
                                <StatsInfo size={size} />
                            ) : (
                                <div className="flex items-center justify-end space-x-2 w-full">
                                    <span className="flex items-center space-x-1">
                                        <span className="text-gray-500 italic font-semibold">
                                            M<sub>PRE</sub>
                                        </span>
                                        <span className="font-sans">
                                            {props.result.preMean.toFixed(2)}
                                        </span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <span className="text-gray-500 italic font-semibold">
                                            M<sub>POST</sub>
                                        </span>
                                        <span className="font-sans">
                                            {props.result.postMean.toFixed(2)}
                                        </span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <span className="text-gray-500 italic font-semibold">
                                            SD<sub>PRE</sub>
                                        </span>
                                        <span className="font-sans">
                                            {props.result.sdPre.toFixed(2)}
                                        </span>
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
