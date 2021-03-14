import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import { v4 as uuidv4 } from "uuid";
import SaveSubmitButton from "../../../../UI/forms/SaveSubmitButton";
import ItemBuilder from "../../../Measure/components/Structure/Item/Builder";
import ItemPreview from "../../../Measure/components/Structure/Item/Preview";
import StringCounter from "../../../../UI/inputs/StringCounter";
import StringInput from "../../../../UI/inputs/StringInput";
import TextInput from "../../../../UI/inputs/TextInput";
import CancelableContainer from "../../../../UI/containers/CancelableContainer";
import GrayFadedMenuBanner from "../../../../UI/GrayFadedMenuBanner";
import GrayFadedBanner from "../../../../UI/GrayFadedBanner";
import { returnEmptyStringIfNullValue } from "../../../../../utilities/HelperFunctions";
import ModalScrollable from "../../../../UI/modals/Scrollable";
import Checkbox from "../../../../UI/inputs/Checkbox";
import PreviewBuilder from "./Preview/Bulider";

export default function StructureEditor({ measure }) {
    const { structure } = measure;
    const [confirmEditModal, setConfirmEditModal] = useState(false);
    const [name, setName] = useState(structure.name);
    const [isPrivate, setIsPrivate] = useState(measure.is_private);
    const [instructions, setInstructions] = useState(
        returnEmptyStringIfNullValue(structure.instructions)
    );
    const [items, setItems] = useState(structure.items);
    const [itemsEdited, setItemsEdited] = useState(false);
    const [displayItemBuilder, setDisplayItemBuilder] = useState(false);
    const [displayPreview, setDisplayPreview] = useState(false);
    const [inputFields, setInputFields] = useState({
        name: true,
        instructions: true,
        items: true,
        validate() {
            return this.name && this.instructions && this.items;
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

    const updateInstructions = string => {
        if (string.length <= 500) {
            setInstructions(string);
        }
    };

    const updateAccessLevel = bool => {
        setIsPrivate(prevState => !prevState);
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
        setItemsEdited(true);
    };

    const onEditItem = array => {
        const [index, item] = array;
        let updatedItems = [...items];
        updatedItems.splice(index, 1, item);
        setItems(updatedItems);
        setItemsEdited(true);
    };

    const onDeleteItem = index => {
        let updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        validateItems(updatedItems);
        setItemsEdited(true);
    };

    const onMoveItemUp = indexOfItem => {
        let updatedItems = [...items];
        [updatedItems[indexOfItem - 1], updatedItems[indexOfItem]] = [
            updatedItems[indexOfItem],
            updatedItems[indexOfItem - 1]
        ];
        setItems(updatedItems);
        setItemsEdited(true);
    };

    const onMoveItemDown = indexOfItem => {
        let updatedItems = [...items];
        [updatedItems[indexOfItem + 1], updatedItems[indexOfItem]] = [
            updatedItems[indexOfItem],
            updatedItems[indexOfItem + 1]
        ];
        setItems(updatedItems);
        setItemsEdited(true);
    };

    const toggleConfirmEditModal = () => {
        setConfirmEditModal(prevState => !prevState);
    };

    const togglePreview = () => {
        setDisplayPreview(prevState => !prevState);
    };

    const submitUpdatedMeasure = () => {
        const updatedMeasure = {
            hashedId: measure.hashed_id,
            isPrivate: isPrivate,
            itemsEdited: itemsEdited,
            structure: {
                name: name,
                instructions: instructions,
                items: items
            }
        };
        Inertia.post("/measure/edit", updatedMeasure);
    };

    return (
        <div className="w-full">
            {confirmEditModal && (
                <ModalScrollable
                    heading="Confirm Edit"
                    toggleModal={toggleConfirmEditModal}
                >
                    {itemsEdited && (
                        <div className="text-xl text-gray-700 p-4 leading-normal">
                            <strong>PLEASE NOTE:</strong> Changing the measure's
                            items invalidates any associated scales. Any
                            existing scales will be deleted and need reinstating
                            manually. Would you like to continue?
                        </div>
                    )}
                    <div className="flex items-center justify-end space-x-2">
                        <button
                            className="w-24 bg-gradient-to-tl font-semibold from-gray-500 px-3 py-2 rounded text-white to-gray-400 uppercase"
                            onClick={() => toggleConfirmEditModal()}
                        >
                            Cancel
                        </button>
                        <SaveSubmitButton
                            label="Confirm & Save"
                            onHandleClick={submitUpdatedMeasure}
                        />
                    </div>
                </ModalScrollable>
            )}
            {displayPreview && (
                <PreviewBuilder
                    toggle={togglePreview}
                    measure={{ structure: { name, instructions, items } }}
                />
            )}
            <div>
                <GrayFadedMenuBanner title="Measure Builder">
                    {inputFields.validate() && (
                        <div className="flex items-center space-x-2 text-sm">
                            <button
                                onClick={() => togglePreview()}
                                className="font-semibold bg-gray-400 px-3 py-2 rounded text-white hover:bg-gray-500 uppercase"
                            >
                                Preview
                            </button>
                            <InertiaLink
                                className="flex font-semibold bg-red-400 items-center px-3 rounded text-white hover:bg-red-500 w-full uppercase py-2"
                                href={"/measure/" + measure.hashed_id}
                            >
                                Cancel
                            </InertiaLink>
                            <button
                                onClick={() => toggleConfirmEditModal()}
                                className="font-semibold bg-green-400 px-3 py-2 rounded text-white hover:bg-green-500 uppercase"
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
                            handleOnStringChange={e =>
                                updateName(e.target.value)
                            }
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
                    <div className="space-y-1">
                        <div className="flex items-start space-x-2 w-full">
                            <div className="text-gray-600 font-semibold w-1/3">
                                Access Level
                            </div>
                            <div className="w-full flex flex-col items-start justify-start">
                                <Checkbox
                                    onCheckboxChange={bool =>
                                        updateAccessLevel(bool)
                                    }
                                    label="Private Measure"
                                    value={isPrivate}
                                    disabled={false}
                                    checked={isPrivate}
                                />
                                <label className="leading-normal max-w-sm py-2 text-gray-500 text-sm">
                                    Uncheck to make this measure public. Public
                                    measures can be viewed and implemented by
                                    other Psychdar users. Sharing is caring! ❤️
                                </label>
                            </div>
                        </div>
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
            </div>
        </div>
    );
}
