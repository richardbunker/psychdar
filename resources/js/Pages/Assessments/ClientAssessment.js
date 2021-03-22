import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import RenderMeasure from "../../components/Models/Measure/components/Render/Measure";
import ModalScrollable from "../../components/UI/modals/Scrollable";
import {
    calculateScaleScore,
    detectAlertableScaleScore
} from "../../components/Models/Assessment/utilities/ScaleScoring";
import LargeSpinner from "../../components/UI/spinners/LargeSpinner";

export default function ClientAssessment(props) {
    const [responses, setResponses] = useState({});
    const [itemsArray, setItemsArray] = useState([]);
    const [invalidItems, setInvalidItems] = useState([]);
    const [displayInvalidItems, setDisplayInvalidItems] = useState(false);
    const [displayIsSubmitting, setDisplayIsSubmitting] = useState(false);

    const setItemOfTextAValue = type => {
        if (type === "Text") {
            return "item.type=Text";
        }
        return null;
    };

    useEffect(() => {
        let prepareResponses = {};
        props.measure.structure.items.map((item, index) => {
            prepareResponses = {
                ...prepareResponses,
                ["item_" + String(index)]: setItemOfTextAValue(item.type)
            };
        });
        setResponses(prepareResponses);
    }, []);

    useEffect(() => {
        let prepareItemsArray = [];
        props.measure.structure.items.map((item, index) => {
            prepareItemsArray = {
                ...prepareItemsArray,
                ["item_" + String(index)]: item.title
            };
        });
        setItemsArray(prepareItemsArray);
    }, []);

    const handleOnItemChange = itemValue => {
        setResponses(prevState => {
            return { ...prevState, ...itemValue };
        });
    };

    const toggleDisplayInvalidItems = () => {
        setDisplayInvalidItems(prevState => !prevState);
    };

    const toggleDisplayIsSubmitting = () => {
        setDisplayIsSubmitting(prevState => !prevState);
    };

    const checkForAlerts = () => {
        if (props.measure.scales) {
            return props.measure.scales
                .map((scale, index) => {
                    if (scale.cuttOffs) {
                        return detectAlertableScaleScore(
                            scale,
                            calculateScaleScore(scale, responses),
                            props.measure
                        );
                    }
                })
                .filter(array => array.length > 0)
                .flat();
        } else {
            return [];
        }
    };

    const submitClientAssessment = () => {
        const values = {
            clientHashedId: props.clientHashedId,
            measureHashedId: props.measure.hashed_id,
            responses: responses,
            alerts: checkForAlerts()
        };
        Inertia.post("/a/client", values);
        toggleDisplayIsSubmitting();
    };

    const promptInvalidItems = () => {
        toggleDisplayInvalidItems();
    };

    const validateInput = () => {
        const keys = Object.keys(responses);
        const unansweredItems = keys.filter(key => {
            return responses[key] === null;
        });
        setInvalidItems(unansweredItems);
        unansweredItems.length > 0
            ? promptInvalidItems()
            : submitClientAssessment();
    };

    return (
        <div className="h-screen min-h-screen w-full max-w-6xl mx-auto overflow-auto">
            {displayInvalidItems && (
                <ModalScrollable heading="Incomplete Items">
                    <div className="text-xl text-gray-700 p-4 leading-normal space-y-2">
                        <div>
                            The following items need to be completed before you
                            can submit your assessment:
                        </div>
                        {invalidItems.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="text-gray-500 font-semibold"
                                >
                                    {itemsArray[item]}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                        <button
                            className="font-semibold hover:bg-gray-500 px-3 py-2 rounded text-white bg-gray-400 uppercase"
                            onClick={() => toggleDisplayInvalidItems()}
                        >
                            I understand
                        </button>
                    </div>
                </ModalScrollable>
            )}
            {displayIsSubmitting && (
                <div className="absolute bg-black bg-opacity-75 h-screen left-0 min-h-screen overflow-auto to-teal-400 top-0 w-full z-10">
                    <div className="flex items-center justify-center w-full min-h-screen h-screen">
                        <LargeSpinner size="120px" />
                    </div>
                </div>
            )}
            <RenderMeasure
                handleOnItemChange={handleOnItemChange}
                measure={props.measure}
                handleSubmit={validateInput}
            />
        </div>
    );
}
