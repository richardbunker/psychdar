import React from "react";

export default function ScalePreview(props) {
    return (
        <div className="bg-gray-800 flex items-center justify-between p-4 rounded space-x-2 text-base w-full">
            <div className="space-y-2 text-gray-300">
                <div className="space-y-2 items-center">
                    <div className="text-green-400 text-2xl">
                        {props.scale.title}
                    </div>
                    <div className="text-gray-300">Operation:</div>
                    <ul className="list-disc pl-6">
                        <li className="text-teal-300 text-base">
                            {props.scale.operation}
                        </li>
                    </ul>
                    <div className="text-teal-300">Items:</div>
                    <ul className="list-disc pl-6">
                        {props.scale.items
                            .sort((a, b) => a - b)
                            .map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="text-teal-300 text-base"
                                    >
                                        {item}
                                    </li>
                                );
                            })}
                    </ul>
                    {props.scale.alpha && (
                        <div className="flex items-center space-x-1">
                            <span className="text-pink-400 italic">alpha</span>
                            <span className="text-gray-200">=</span>
                            <span className="text-gray-200">
                                {props.scale.alpha}
                            </span>
                        </div>
                    )}
                    {props.scale.sd && (
                        <div className="flex items-center space-x-1">
                            <span className="text-teal-300 italic">sd</span>
                            <span className="text-gray-200">=</span>
                            <span className="text-gray-200">
                                {props.scale.sd}
                            </span>
                        </div>
                    )}
                </div>
                {props.scale.cuttOffs.length > 0 &&
                    props.scale.cuttOffs.map(cuttOff => {
                        return (
                            <div
                                key={cuttOff.label}
                                className="flex items-center space-x-1 pl-2 text-base"
                            >
                                <div className="text-blue-500">
                                    if result {cuttOff.min}
                                    {" - "}
                                    {cuttOff.max}
                                </div>
                                <div>
                                    <svg
                                        className="w-4 h-4 text-gray-200"
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
                                </div>
                                <div>"{cuttOff.label}"</div>
                                {cuttOff.alert && (
                                    <>
                                        <div>
                                            <svg
                                                className="w-4 h-4 text-gray-200"
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
                                        </div>
                                        <div className="text-yellow-200">
                                            {cuttOff.alert ? "Email Alert" : ""}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
            </div>
            {props.editable ? (
                <div className="space-x-1">
                    <button
                        value={props.index}
                        onClick={() => props.editScaleItem(props.index)}
                        className="p-1"
                    >
                        <svg
                            className="w-5 h-5 text-gray-400 hover:text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button
                        value={props.index}
                        onClick={() => props.deleteScaleItem(props.index)}
                        className="p-1"
                    >
                        <svg
                            className="w-5 h-5 text-gray-400 hover:text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
