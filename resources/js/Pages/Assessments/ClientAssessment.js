import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import RenderMeasure from "../../components/Models/Measure/components/Render/Measure";
import ModalScrollable from "../../components/UI/modals/Scrollable";

export default function ClientAssessment(props) {
    const [responses, setResponses] = useState({});
    const [itemsArray, setItemsArray] = useState([]);
    const [invalidItems, setInvalidItems] = useState([]);
    const [displayInvalidItems, setDisplayInvalidItems] = useState(false);

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

    const submitClientAssessment = () => {
        const values = {
            clientHashedId: props.clientHashedId,
            measureHashedId: props.measure.hashed_id,
            responses: responses
        };
        Inertia.post("/a/client", values);
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
                                <div key={index} className="flex items-center">
                                    <svg
                                        className="w-6 h-6 text-gray-500 mr-2"
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
                                    <div className="text-gray-500 font-semibold">
                                        {itemsArray[item]}
                                    </div>
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
            <RenderMeasure
                handleOnItemChange={handleOnItemChange}
                measure={props.measure}
                handleSubmit={validateInput}
            />
        </div>
    );
}
