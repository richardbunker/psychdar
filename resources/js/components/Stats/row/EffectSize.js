import React, { useEffect, useState } from "react";
import Spinner from "../../UI/spinners/Spinner";
import { mean, correllation, stdDev } from "../Stats";

export default function EffectSizeRow(props) {
    const [isLoading, setIsLoading] = useState(true);

    const [showInfoBox, setShowInfoBox] = useState(false);

    const [notEnoughData, setNotEnoughData] = useState(false);

    const [esPre, setEsPre] = useState(0);

    const [esRmc, setEsRmc] = useState(0);

    const runStatistics = ({ pre, post }) => {
        const preMean = mean(pre);
        const postMean = mean(post);
        const r = correllation(pre, post);
        const preSD = stdDev(pre);

        const esPre = ((postMean - preMean) / preSD).toFixed(2);
        const esRmc = (esPre / Math.sqrt(2 * (1 - r))).toFixed(2);

        setEsPre(esPre);
        setEsRmc(esRmc);

        setIsLoading(false);
    };

    const toggleInfoBox = () => {
        setShowInfoBox(preState => !preState);
    };

    const handleClick = () => {
        toggleInfoBox();
    };

    const disableProcess = () => {
        setNotEnoughData(true);
        setIsLoading(false);
    };

    useEffect(() => {
        if (props.clinician.clients.length >= 30) {
            axios
                .get("/api/pre_post/" + props.clinician.hashed_id + "/core10")
                .then(response => {
                    runStatistics(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            disableProcess();
        }
    }, []);

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
                <div className="">Effect Size</div>
                <div className="ml-2  flex">
                    {isLoading ? (
                        <Spinner size="20px" />
                    ) : (
                        <div className="flex flex-col space-y-3">
                            {notEnoughData ? (
                                <span
                                    onClick={handleClick}
                                    className="relative cursor-pointer"
                                >
                                    {showInfoBox ? (
                                        <div className="w-60 bottom-0 right-0 absolute z-10 text-base text-gray-500 bg-white p-4 rounded shadow-md">
                                            <div className="text-sm font-medium w-full text-center">
                                                {
                                                    "Sample size too small (n < 30)"
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <span>
                                        <svg
                                            className={
                                                "w-" +
                                                (size - 2) +
                                                " " +
                                                "h-" +
                                                (size - 2) +
                                                " " +
                                                "text-gray-400"
                                            }
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </span>
                            ) : (
                                <span>
                                    <span className="text-gray-500 italic">
                                        ES<sub>RMC</sub>
                                    </span>
                                    <span className="ml-1">{esRmc}</span>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
