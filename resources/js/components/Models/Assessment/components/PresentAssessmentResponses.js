import React from "react";
import { truncateString } from "../../../../utilities/HelperFunctions";

export default function PresentAssessmentResponses(props) {
    return (
        <div className="py-4 px-6 bg-gray-800 text-sm sm:text-lg space-y-4 leading-normal rounded-b">
            <div className="space-y-2">
                {props.measure.structure.items.map((item, index) => {
                    switch (item.type) {
                        case "Qualitative":
                            return (
                                <div key={index} className="font-semibold">
                                    <div className="text-green-400">
                                        {item.title}
                                    </div>
                                    <div className="text-blue-400">
                                        {
                                            props.responses[
                                                "item_" + String(index)
                                            ]
                                        }
                                    </div>
                                </div>
                            );
                            break;
                        case "Text":
                            return <div key={index}></div>;
                            break;

                        default:
                            return (
                                <div
                                    key={index}
                                    className="flex items-center justify-between font-semibold"
                                >
                                    <div className="text-green-400">
                                        {truncateString(item.title, 50)}
                                    </div>
                                    <div className="text-blue-400">
                                        {
                                            props.responses[
                                                "item_" + String(index)
                                            ]
                                        }
                                    </div>
                                </div>
                            );
                            break;
                    }
                })}
            </div>
        </div>
    );
}
