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
import GrayFadedMenuBanner from "../../../../UI/GrayFadedMenuBanner";
import GrayFadedBanner from "../../../../UI/GrayFadedBanner";

export default function StructureBuilder(props) {
    const [confirmCreateModal, setConfirmCreateModal] = useState(false);
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

    const toggleConfirmCreate = () => {
        setConfirmCreateModal(prevState => !prevState);
    };

    const submitMeasure = () => {
        const measure = {
            name: name,
            abbr: abbr,
            instructions: instructions,
            items: items
        };
        Inertia.post("/measures", measure);
    };

    return (
        <div className="w-full">
            {confirmCreateModal && (
                <ModalCentered
                    maxWidth="max-w-sm"
                    heading="Confirm"
                    toggleModal={toggleConfirmCreate}
                >
                    <div className="flex items-center justify-end space-x-2">
                        <button
                            className="w-24 bg-gradient-to-tl font-semibold from-gray-500 px-3 py-2 rounded text-white to-gray-400 uppercase"
                            onClick={() => toggleConfirmCreate()}
                        >
                            Cancel
                        </button>
                        <SaveSubmitButton onHandleClick={submitMeasure} />
                    </div>
                </ModalCentered>
            )}
            <GrayFadedMenuBanner title="Measure Builder">
                {inputFields.validate() && (
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={togglePreview}
                            className="bg-gradient-to-tl flex font-semibold from-gray-500 items-center px-3 rounded text-sm text-white to-gray-400 w-full uppercase py-2"
                        >
                            Preview
                        </button>
                        <button
                            onClick={() => toggleConfirmCreate()}
                            className="bg-gradient-to-tl flex font-semibold from-teal-500 items-center px-3 rounded text-sm text-white to-teal-400 w-full uppercase py-2"
                        >
                            Save
                        </button>
                    </div>
                )}
            </GrayFadedMenuBanner>
            <div className="p-4 w-full text-lg space-y-6 bg-white">
                <div className="space-y-1">
                    <StringInput
                        value={name}
                        handleOnStringChange={e => updateName(e.target.value)}
                        title="Name"
                        placeholder="Depression, Anxiety and Stress Scale 21"
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
            </div>
            <div className="mt-2">
                <GrayFadedBanner title="Items" />
                <div className="p-4 bg-white space-y-4">
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
                                className="border-2 border-teal-300 font-semibold hover:bg-teal-50 px-3 py-4 rounded text-teal-400 uppercase w-full"
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
        </div>
    );
}
