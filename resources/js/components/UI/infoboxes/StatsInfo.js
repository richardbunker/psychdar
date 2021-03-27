import React, { useState } from "react";
import ModalScrollable from "../modals/Scrollable";

export default function StatsInfo(props) {
    const [showInfoBox, setShowInfoBox] = useState(false);

    const toggleInfoBox = () => {
        setShowInfoBox(prevState => !prevState);
    };
    return (
        <div onClick={toggleInfoBox} className="cursor-pointer">
            {showInfoBox && (
                <ModalScrollable heading="Information" toggle={toggleInfoBox}>
                    <div className="leading-normal w-full p-4 text-left space-y-4">
                        <div className="text-lg text-gray-600">
                            {
                                "Your sample size is too small (n < 30). It's recommended you have at least 30 completed treatment episodes with a minimum of 2 assessments of the same measure within that treatment episode. Repeated Measures effect size calculations are deemed unreliable if there are fewer than 30 cases (Seidel, Miller & Chow 2013)."
                            }
                        </div>
                        <div className="space-y-1 text-base">
                            <div className="font-semibold text-gray-500">
                                Reference
                            </div>
                            <div className="text-gray-600 text-sm">
                                Jason A. Seidel, Scott D. Miller & Daryl L. Chow
                                , Psychotherapy Research (2013): Effect size
                                calculations for the clinician: Methods and
                                comparability, Psychotherapy Research, DOI:
                                10.1080/10503307.2013.840812
                            </div>
                        </div>
                    </div>
                </ModalScrollable>
            )}
            <span>
                <svg
                    className={
                        "w-" +
                        (props.size - 2) +
                        " " +
                        "h-" +
                        (props.size - 2) +
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
        </div>
    );
}
