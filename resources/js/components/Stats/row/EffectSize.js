import Axios from "axios";
import React, { useEffect, useState } from "react";
import { calculateScaleScore } from "../../Models/Assessment/utilities/ScaleScoring";
import QuestionMark from "../../UI/dropdowns/QuestionMark";
import Spinner from "../../UI/spinners/Spinner";
import { mean, correllation, stdDev, tTest } from "../Stats";

export default function EffectSizeRow(props) {
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
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                    clipRule="evenodd"
                />
            </svg>
            <div className="text-gray-600 ml-3 mt-1 flex items-center justify-between w-full">
                <div className="">{props.heading}</div>
                <div className="ml-2  flex">
                    {props.isLoading ? (
                        <Spinner size="20px" />
                    ) : (
                        <div className="flex flex-col space-y-3">
                            {props.notEnoughData ? (
                                <QuestionMark
                                    position=" bottom-0 right-0 w-60"
                                    text="Sample size too small (n < 30)"
                                    size={size}
                                />
                            ) : (
                                <div className="flex items-center space-x-2">
                                    {props.result.significant ? (
                                        <div className="flex items-center space-x-2">
                                            <span>
                                                <span className="text-gray-500 italic font-semibold">
                                                    ES<sub>PRE</sub>
                                                </span>
                                                <span className="ml-1">
                                                    {props.result.esPre}
                                                </span>
                                            </span>
                                            <span className="text-gray-500 font-semibold">
                                                /
                                            </span>
                                            <span>
                                                <span className="text-gray-500 italic font-semibold">
                                                    ES<sub>RMC</sub>
                                                </span>
                                                <span className="ml-1">
                                                    {props.result.esRmc}
                                                </span>
                                            </span>
                                        </div>
                                    ) : (
                                        <span>
                                            <span className="text-gray-500 italic font-semibold">
                                                ES<sub>RMC</sub>
                                            </span>
                                            <span className="ml-1">(ns)</span>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
