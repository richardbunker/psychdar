import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { v4 as uuidv4 } from "uuid";
import SaveSubmitButton from "../../../../UI/forms/SaveSubmitButton";
import ModalCentered from "../../../../UI/modals/Centered";
import Checkbox from "../../../../UI/inputs/Checkbox";
import ItemBuilder from "../../../Measure/components/Structure/Item/Builder";
import ItemPreview from "../../../Measure/components/Structure/Item/Preview";
import PreviewBuilder from "../../../Measure/components/Structure/Preview/Bulider";
import StringCounter from "../../../../UI/inputs/StringCounter";
import StringInput from "../../../../UI/inputs/StringInput";
import TextInput from "../../../../UI/inputs/TextInput";
import CancelableContainer from "../../../../UI/containers/CancelableContainer";

export default function MeasureBuilder(props) {
    const [addOrganistationsModal, setAddOrganisationsmodal] = useState(false);
    const [selectedOrganisations, setSelectedOrganisations] = useState([]);
    const [name, setName] = useState("");
    const [abbr, setAbbr] = useState("");
    const [instructions, setInstructions] = useState("");
    const [items, setItems] = useState([]);
    const [displayItemBuilder, setDisplayItemBuilder] = useState(false);
    const [displayPreview, setDisplayPreview] = useState(false);
    const [inputFields, setInputFields] = useState({
        name: false,
        abbr: true,
        instructions: true,
        items: false,
        validate() {
            return this.name && this.abbr && this.instructions && this.items;
        }
    });

    const validateString = (string, minLength, field) => {
        if (string.length >= minLength) {
            setInputFields(prevState => {
                return { ...prevState, [field]: true };
            });
        } else {
            setInputFields(prevState => {
                return { ...prevState, [field]: false };
            });
        }
    };

    const validateItems = items => {
        if (items.length >= 1) {
            setInputFields(prevState => {
                return { ...prevState, items: true };
            });
        } else {
            setInputFields(prevState => {
                return { ...prevState, items: false };
            });
        }
    };

    const updateName = string => {
        if (string.length <= 100) {
            setName(string);
            validateString(string, 6, "name");
        }
    };

    const updateAbbr = string => {
        if (string.length <= 15) {
            setAbbr(string);
        }
    };

    const updateInstructions = string => {
        if (string.length <= 500) {
            setInstructions(string);
        }
    };

    const toggleItemBuilder = () => {
        setDisplayItemBuilder(prevState => !prevState);
    };

    const onNewItem = item => {
        setDisplayItemBuilder(false);
        setItems(prevState => {
            const newItems = [...prevState, item];
            validateItems(newItems);
            return newItems;
        });
    };

    const onEditItem = array => {
        const [index, item] = array;
        let updatedItems = [...items];
        updatedItems.splice(index, 1, item);
        setItems(updatedItems);
    };

    const onDeleteItem = index => {
        let updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        validateItems(updatedItems);
    };

    const onMoveItemUp = indexOfItem => {
        let updatedItems = [...items];
        [updatedItems[indexOfItem - 1], updatedItems[indexOfItem]] = [
            updatedItems[indexOfItem],
            updatedItems[indexOfItem - 1]
        ];
        setItems(updatedItems);
    };

    const onMoveItemDown = indexOfItem => {
        let updatedItems = [...items];
        [updatedItems[indexOfItem + 1], updatedItems[indexOfItem]] = [
            updatedItems[indexOfItem],
            updatedItems[indexOfItem + 1]
        ];
        setItems(updatedItems);
    };

    const togglePreview = () => {
        setDisplayPreview(prevState => !prevState);
    };

    const toggleAddOrganisationsModal = () => {
        setAddOrganisationsmodal(prevState => !prevState);
    };

    const updateSelectedOrganisations = orgHash => {
        setSelectedOrganisations(prevState => {
            if (prevState.includes(orgHash)) {
                return [...prevState].filter(hash => hash !== orgHash);
            } else {
                return [...prevState, orgHash];
            }
        });
    };

    const submitMeasure = () => {
        const measure = {
            name: name,
            abbr: abbr,
            instructions: instructions,
            items: items,
            orgs: selectedOrganisations
        };
        Inertia.post("/measures", measure);
    };

    return (
        <main className="w-full">
            {addOrganistationsModal && (
                <ModalCentered
                    heading="Add Organisations"
                    toggleModal={toggleAddOrganisationsModal}
                >
                    <div className="space-y-2">
                        {props.organisations.map(org => {
                            return (
                                <Checkbox
                                    onCheckboxChange={
                                        updateSelectedOrganisations
                                    }
                                    key={org.hashed_id}
                                    checked={
                                        selectedOrganisations[org.hashed_id]
                                    }
                                    value={org.hashed_id}
                                    label={org.name}
                                />
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                        {selectedOrganisations.length > 0 && (
                            <SaveSubmitButton onHandleClick={submitMeasure} />
                        )}
                    </div>
                </ModalCentered>
            )}
            <div className="flex items-center justify-between h-12">
                <div className="text-3xl font-bold text-gray-700">
                    Measure Builder
                </div>
                {inputFields.validate() && (
                    <div className="flex space-x-2">
                        <button
                            onClick={togglePreview}
                            className="flex items-center bg-gradient-to-tl font-semibold from-teal-500 px-3 py-2 rounded text-white to-teal-400 uppercase w-full"
                        >
                            <svg
                                className="w-6 h-6 text-white mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                            Preview
                        </button>
                        <button
                            onClick={() => toggleAddOrganisationsModal()}
                            className="flex items-center bg-gradient-to-tl font-semibold from-green-500 px-3 py-2 rounded text-white to-green-400 uppercase w-full"
                        >
                            <svg
                                className="w-6 h-6 text-white mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                            </svg>
                            Save
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-4 p-4 w-full text-lg space-y-6 bg-white shadow-md rounded">
                <div className="space-y-1">
                    <StringInput
                        value={name}
                        handleOnStringChange={e => updateName(e.target.value)}
                        title="Name"
                        placeholder="Depression, Anxiety, Stress Scale 21"
                    />
                    {name.length > 0 && (
                        <StringCounter
                            isValid={inputFields.name}
                            number={name.length}
                            max="100"
                        />
                    )}
                </div>
                <div className="space-y-1">
                    <StringInput
                        value={abbr}
                        handleOnStringChange={e => updateAbbr(e.target.value)}
                        title="Abbreviation"
                        placeholder="DASS21"
                    />
                    {abbr.length > 0 && (
                        <StringCounter
                            isValid={inputFields.abbr}
                            number={abbr.length}
                            max="15"
                        />
                    )}
                </div>
                <div className="space-y-1">
                    <TextInput
                        value={instructions}
                        title="Instructions"
                        handleOnTextChange={e =>
                            updateInstructions(e.target.value)
                        }
                        placeholder="Over the past week..."
                    />
                    {instructions.length > 0 && (
                        <StringCounter
                            isValid={inputFields.instructions}
                            number={instructions.length}
                            max="500"
                        />
                    )}
                </div>
                <div className="space-y-4">
                    <div className="text-gray-600 font-semibold">Items</div>
                    {items.map((item, index) => {
                        return (
                            <ItemPreview
                                key={uuidv4()}
                                index={index}
                                item={item}
                                itemsLength={items.length}
                                onMoveItemUp={onMoveItemUp}
                                onMoveItemDown={onMoveItemDown}
                                onDeleteItem={onDeleteItem}
                                onEditItem={onEditItem}
                            />
                        );
                    })}
                    {!displayItemBuilder && (
                        <div className="w-full">
                            <button
                                onClick={() => toggleItemBuilder()}
                                className="bg-gradient-to-tl font-semibold from-green-500 px-3 py-4 rounded text-white to-green-400 uppercase w-full"
                            >
                                Add Item
                            </button>
                        </div>
                    )}
                    {displayItemBuilder && (
                        <CancelableContainer toggleSelf={toggleItemBuilder}>
                            <ItemBuilder onNewItem={onNewItem} />
                        </CancelableContainer>
                    )}
                </div>
            </div>
            {displayPreview && (
                <PreviewBuilder
                    toggle={togglePreview}
                    measure={{ name, abbr, instructions, items }}
                />
            )}
        </main>
    );
}
