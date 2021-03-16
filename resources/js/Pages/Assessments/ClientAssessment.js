import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import RenderMeasure from "../../components/Models/Measure/components/Render/Measure";
import SaveSubmitButton from "../../components/UI/forms/SaveSubmitButton";

export default function ClientAssessment(props) {
    const [responses, setResponses] = useState({});
    const [displayAssessment, setDisplayAssessment] = useState(true);

    const handleOnItemChange = itemValue => {
        setResponses(prevState => {
            return { ...prevState, ...itemValue };
        });
    };

    const toggleDisplayAssessment = () => {
        setDisplayAssessment(prevState => !prevState);
    };

    const submitClientAssessment = () => {
        const values = {
            clientHashedId: props.clientHashedId,
            measureHashedId: props.measure.hashed_id,
            responses: responses
        };
        Inertia.post("/a/client", values);
        toggleDisplayAssessment();
    };

    return (
        <div className="h-screen min-h-screen w-full max-w-6xl mx-auto xl:pt-10">
            {displayAssessment ? (
                <div className="bg-white">
                    <RenderMeasure
                        handleOnItemChange={handleOnItemChange}
                        measure={props.measure}
                    />
                    <div className="w-72 mx-auto py-10">
                        <SaveSubmitButton
                            onHandleClick={submitClientAssessment}
                            label="Submit"
                        />
                    </div>
                </div>
            ) : (
                <div className="h-full min-h-full flex items-center justify-center">
                    <div className="p-10 rounded bg-white shadow flex items-center justify-center space-y-2">
                        <div className="text-center">
                            <div className="font-semibold text-3xl text-gray-700">
                                Thank you
                            </div>
                            <div className="text-gray-500">
                                Please close this window.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
