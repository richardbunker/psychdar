import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CancelableContainer from "../../../../UI/containers/CancelableContainer";
import ScaleBuilder from "./Scale/ScaleBuilder";
import ScaleEditor from "./Scale/ScaleEditor";
import ScalePreview from "./Scale/ScalePreview";

export default function ScalesBuilder(props) {
    const [scales, setScales] = useState([]);
    const [isBuilding, setIsBuilding] = useState(false);
    const [scaleEditing, setScaleEditing] = useState({});

    useEffect(() => {
        if (props.measure.scales) {
            setScales(props.measure.scales);
        }
    }, []);

    const [displayScaleBuilder, setDisplayScaleBuilder] = useState(false);

    const [displayScaleEditor, setDisplayScaleEditor] = useState(false);

    const toggleScaleBuilder = () => {
        setDisplayScaleBuilder(prevState => !prevState);
        setIsBuilding(prevState => !prevState);
    };

    const toggleScaleEditor = () => {
        setDisplayScaleEditor(prevState => !prevState);
        setIsBuilding(prevState => !prevState);
    };

    const onSubmitScale = scaleObject => {
        setScales(prevState => {
            return [...prevState, scaleObject];
        });
        toggleScaleBuilder();
    };

    const onDeleteScale = index => {
        let updatedScales = [...scales];
        updatedScales.splice(index, 1);
        setScales(updatedScales);
    };

    const onSubmitEditedScale = editingObject => {
        let updatedScales = [...scales];
        updatedScales.splice(editingObject.index, 1, editingObject.scale);
        setScales(updatedScales);
        toggleScaleEditor();
    };

    const onEditScale = index => {
        setScaleEditing({ scale: scales[index], index: index });
        toggleScaleEditor();
    };

    const updateScales = () => {
        props.onScalesSubmit(scales);
    };
    return (
        <div className="space-y-4">
            {isBuilding ? (
                <>
                    {displayScaleBuilder && (
                        <CancelableContainer
                            heading="Create Scale"
                            toggleSelf={toggleScaleBuilder}
                        >
                            <ScaleBuilder
                                toggleSelf={setDisplayScaleBuilder}
                                onSubmitScale={onSubmitScale}
                                items={props.measure.structure.items}
                            />
                        </CancelableContainer>
                    )}
                    {displayScaleEditor && (
                        <CancelableContainer
                            heading="Edit Scale"
                            toggleSelf={toggleScaleEditor}
                        >
                            <ScaleEditor
                                editing={scaleEditing}
                                toggleSelf={toggleScaleEditor}
                                onSubmitScale={onSubmitEditedScale}
                                items={props.measure.structure.items}
                            />
                        </CancelableContainer>
                    )}
                </>
            ) : (
                <>
                    {scales.length > 0 && (
                        <div className="space-y-2 w-full">
                            <div className="flex items-start justify-between">
                                <div className="text-gray-500 w-full font-semibold flex flex-col space-y-1">
                                    {scales.map((scale, index) => {
                                        return (
                                            <ScalePreview
                                                editable={
                                                    props.measure.is_private
                                                }
                                                index={index}
                                                deleteScaleItem={onDeleteScale}
                                                editScaleItem={onEditScale}
                                                key={uuidv4()}
                                                scale={scale}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                    {props.measure.is_private ? (
                        <div className="space-y-2">
                            <div className="w-full">
                                <button
                                    onClick={() => toggleScaleBuilder()}
                                    className="border-2 border-teal-300 font-semibold hover:bg-teal-50 px-3 py-4 rounded text-teal-400 uppercase w-full"
                                >
                                    Create Scale
                                </button>
                            </div>
                            <div className="w-full flex items-center justify-end space-x-2">
                                <button
                                    onClick={props.toggleModal}
                                    className="font-semibold bg-gray-400 px-3 py-2 rounded text-white uppercase hover:shadow hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={updateScales}
                                    className="font-semibold bg-blue-400 px-3 py-2 rounded text-white uppercase hover:shadow hover:bg-blue-500"
                                >
                                    Update Scoring
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-end space-x-2">
                            <button
                                onClick={props.toggleModal}
                                className="font-semibold bg-gray-400 px-3 py-2 rounded text-white uppercase hover:shadow hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
