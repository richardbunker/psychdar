import React from "react";
import QuestionMark from "../../UI/dropdowns/QuestionMark";
import Spinner from "../../UI/spinners/Spinner";

export default function Significance(props) {
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
                    d="M4.649 3.084A1 1 0 015.163 4.4 13.95 13.95 0 004 10c0 1.993.416 3.886 1.164 5.6a1 1 0 01-1.832.8A15.95 15.95 0 012 10c0-2.274.475-4.44 1.332-6.4a1 1 0 011.317-.516zM12.96 7a3 3 0 00-2.342 1.126l-.328.41-.111-.279A2 2 0 008.323 7H8a1 1 0 000 2h.323l.532 1.33-1.035 1.295a1 1 0 01-.781.375H7a1 1 0 100 2h.039a3 3 0 002.342-1.126l.328-.41.111.279A2 2 0 0011.677 14H12a1 1 0 100-2h-.323l-.532-1.33 1.035-1.295A1 1 0 0112.961 9H13a1 1 0 100-2h-.039zm1.874-2.6a1 1 0 011.833-.8A15.95 15.95 0 0118 10c0 2.274-.475 4.44-1.332 6.4a1 1 0 11-1.832-.8A13.949 13.949 0 0016 10c0-1.993-.416-3.886-1.165-5.6z"
                    clipRule="evenodd"
                />
            </svg>
            <div className="text-gray-600 ml-3 mt-1 flex items-center justify-between w-full">
                <div className="w-full">{props.heading}</div>
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
                                    <span className="flex items-center space-x-1">
                                        <span className="text-gray-500 italic font-semibold">
                                            t
                                        </span>
                                        <span className="not-italic">=</span>
                                        <span className="">
                                            {props.result.t.toFixed(2)}
                                        </span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <span className="text-gray-500 italic font-semibold">
                                            p
                                        </span>
                                        <span className="not-italic">=</span>
                                        <span className="">
                                            {props.result.p.toFixed(2)}
                                        </span>
                                        {!props.result.significant && (
                                            <span className="ml-1 italic">
                                                (ns)
                                            </span>
                                        )}
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
