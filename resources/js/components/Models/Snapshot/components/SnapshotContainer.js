import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { returnDateString } from "../../../../utilities/HelperFunctions";

export default function SnapshotContainer({ snapshot, toggle }) {
    const deleteSnapshot = () => {
        const values = {
            hashedSnapshotId: snapshot.hashed_id
        };
        Inertia.post("/delete-snapshot", values);
        toggle();
    };
    return (
        <div className="flex items-center justify-between p-4 rounded shadow text-base w-full">
            <div className="flex flex-col w-full">
                <div className="text-gray-500 font-semibold">
                    {snapshot.data.date}
                </div>
                <div className="text-gray-600 py-2 flex flex-col w-full space-y-2">
                    <div className="flex items-center w-full">
                        <div className="w-1/3">Treatments Started:</div>
                        <div className="">
                            {returnDateString(
                                snapshot.data.effectSizeSettings.start
                            )}
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <div className="w-1/3">Treatments Completed:</div>
                        <div className="">
                            {returnDateString(
                                snapshot.data.effectSizeSettings.end
                            )}
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <div className="w-1/3">Measure:</div>
                        <div className="">
                            {snapshot.data.effectSizeSettings.name}
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <div className="w-1/3">Scale:</div>
                        <div className="">
                            {snapshot.data.effectSizeSettings.scale.title}
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <div className="w-1/3">Descriptive Stats:</div>
                        <div className="flex items-center justify-start space-x-2">
                            <span className="flex items-center space-x-1">
                                <span className="text-gray-500 italic font-semibold">
                                    M<sub>PRE</sub>
                                </span>
                                <span className="font-sans">
                                    {snapshot.data.result.preMean.toFixed(2)}
                                </span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <span className="text-gray-500 italic font-semibold">
                                    M<sub>POST</sub>
                                </span>
                                <span className="font-sans">
                                    {snapshot.data.result.postMean.toFixed(2)}
                                </span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <span className="text-gray-500 italic font-semibold">
                                    SD<sub>PRE</sub>
                                </span>
                                <span className="font-sans">
                                    {snapshot.data.result.sdPre.toFixed(2)}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <div className="w-1/3">Repeated Measures:</div>
                        <div className="flex items-center justify-start space-x-2">
                            <span className="flex items-center">
                                <span className="text-gray-500 italic font-semibold">
                                    t
                                </span>
                                <span className="not-italic">=</span>
                                <span className="">
                                    {snapshot.data.result.t.toFixed(2)}
                                </span>
                            </span>
                            <span className="flex items-center">
                                <span className="text-gray-500 italic font-semibold">
                                    df
                                </span>
                                <span className="not-italic">=</span>
                                <span className="font-sans">
                                    {snapshot.data.result.df}
                                </span>
                            </span>
                            <span className="flex items-center">
                                <span className="text-gray-500 italic font-semibold">
                                    p
                                </span>
                                <span className="not-italic">=</span>
                                <span className="">
                                    {snapshot.data.result.p.toFixed(2)}
                                </span>
                                {snapshot.data.result.significant ? (
                                    <sup>***</sup>
                                ) : (
                                    <span className="ml-1 italic">ns</span>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <div className="w-1/3">Effect Sizes:</div>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                                <span>
                                    <span className="text-gray-500 italic font-semibold">
                                        ES<sub>PRE</sub>
                                    </span>
                                    <span className="ml-1">
                                        {snapshot.data.result.esPre.toFixed(2)}
                                    </span>
                                </span>
                                <span>
                                    <span className="text-gray-500 italic font-semibold">
                                        ES<sub>RMC</sub>
                                    </span>
                                    <span className="ml-1">
                                        {snapshot.data.result.esRmc.toFixed(2)}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={deleteSnapshot} className="cursor-pointer">
                <svg
                    className="w-6 h-6 text-gray-400 hover:text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
}
