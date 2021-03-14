import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CancelableContainer from "../../../../UI/containers/CancelableContainer";
import ScaleBuilder from "./Scale/ScaleBuilder";
import ScalePreview from "./Scale/ScalePreview";

export default function ScalesBuilder(props) {
    const [scales, setScales] = useState([]);

    useEffect(() => {
        if (props.measure.scales) {
            setScales(props.measure.scales);
        }
    }, []);

    const [displayScaleBuilder, setDisplayScaleBuilder] = useState(false);

    const toggleScaleBuilder = () => {
        setDisplayScaleBuilder(prevState => !prevState);
    };

    const onSubmitScale = scaleObject => {
        setScales(prevState => {
            return [...prevState, scaleObject];
        });
        setDisplayScaleBuilder(false);
    };

    const onDeleteScale = index => {
        let updatedScales = [...scales];
        updatedScales.splice(index, 1);
        setScales(updatedScales);
    };

    const updateScales = () => {
        props.onScalesSubmit(scales);
    };
    return (
        <div className="space-y-4">
            {scales.length > 0 && (
                <div className="flex items-start space-x-2 w-full">
                    <div className="text-gray-600 font-semibold w-1/3">
                        Scales
                    </div>
                    <div className="space-y-3 w-full">
                        <div className="flex items-start justify-between">
                            <div className="text-gray-500 w-full font-semibold flex flex-col space-y-1">
                                {scales.map((scale, index) => {
                                    return (
                                        <ScalePreview
                                            index={index}
                                            deleteScaleItem={onDeleteScale}
                                            key={uuidv4()}
                                            scale={scale}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!displayScaleBuilder && (
                <div className="w-full">
                    <button
                        onClick={() => toggleScaleBuilder()}
                        className="border-2 border-teal-300 font-semibold hover:bg-teal-50 px-3 py-4 rounded text-teal-400 uppercase w-full"
                    >
                        Add Scale
                    </button>
                </div>
            )}
            {displayScaleBuilder && (
                <CancelableContainer
                    heading="Scale Details"
                    toggleSelf={toggleScaleBuilder}
                >
                    <ScaleBuilder
                        toggleSelf={setDisplayScaleBuilder}
                        onSubmitScale={onSubmitScale}
                        items={props.measure.structure.items}
                    />
                </CancelableContainer>
            )}
            <div className="w-full flex items-center justify-end space-x-2">
                <button
                    onClick={() => props.toggleModal()}
                    className="font-semibold bg-gray-400 px-3 py-2 rounded text-white uppercase hover:shadow hover:bg-gray-500"
                >
                    Cancel
                </button>
                <button
                    onClick={updateScales}
                    className="font-semibold bg-blue-400 px-3 py-2 rounded text-white uppercase hover:shadow hover:bg-blue-500"
                >
                    Update
                </button>
            </div>
        </div>
    );
}