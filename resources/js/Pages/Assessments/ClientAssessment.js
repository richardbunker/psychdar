import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import RenderMeasure from "../../components/Models/Measure/components/Render/Measure";
import ModalScrollable from "../../components/UI/modals/Scrollable";

export default function ClientAssessment(props) {
    const [responses, setResponses] = useState({});
    const [itemsArray, setItemsArray] = useState([]);
    const [invalidItems, setInvalidItems] = useState([]);
    const [displayInvalidItems, setDisplayInvalidItems] = useState(false);

    // const itemType = type => {
    //     if (type === "Qualitative" || type === "Text") {
    //         return "";
    //     } else {
    //         return null;
    //     }
    // };

    useEffect(() => {
        let prepareResponses = {};
        props.measure.structure.items.map((item, index) => {
            prepareResponses = {
                ...prepareResponses,
                ["item_" + String(index)]: null
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
        const badItems = keys.filter(key => {
            return responses[key] === null;
        });
        console.log(badItems);
        setInvalidItems(badItems);
        badItems.length > 0 ? promptInvalidItems() : submitClientAssessment();
    };

    return (
        <div className="h-screen min-h-screen w-full max-w-6xl mx-auto">
            {displayInvalidItems && (
                <ModalScrollable heading="Error">
                    <div className="text-xl text-gray-700 p-4 leading-normal">
                        <div>
                            The following items need to be completed before you
                            can submit your assessment:
                        </div>
                        <ul className="list-disc pl-10 py-2">
                            {invalidItems.map((item, index) => {
                                return <li key={index}>{itemsArray[item]}</li>;
                            })}
                        </ul>
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
