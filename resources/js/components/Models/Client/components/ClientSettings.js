import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import {
    validateString,
    validateUriString
} from "../../../../utilities/HelperFunctions";
import StringInput from "../../../UI/inputs/StringInput";
import StringCounter from "../../../UI/inputs/StringCounter";
import UpdateStatusForm from "../../../UI/forms/UpdateStatusForm";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import ErrorInput from "../../../UI/inputs/ErrorInput";

export default function ClientSettings(props) {
    const [clientSettings, setClientSettings] = useState({
        identifier: props.client.identifier,
        active: props.client.is_active,
        url: props.client.url_access,
        customClientUri: props.client.custom_client_uri
    });
    const [inputFields, setInputFields] = useState({
        name: true,
        customClientUri: true,
        validate() {
            return this.name && this.customClientUri;
        }
    });

    const updateName = value => {
        if (value.length <= 25) {
            setClientSettings(prevState => {
                return { ...prevState, identifier: value };
            });
        }
        if (validateString(value, 3)) {
            setInputFields(prevState => {
                return { ...prevState, name: true };
            });
        } else {
            setInputFields(prevState => {
                return { ...prevState, name: false };
            });
        }
    };

    const updateCustomUri = value => {
        if (value.length <= 50) {
            setClientSettings(prevState => {
                return { ...prevState, customClientUri: value };
            });
        }
        setInputFields(prevState => {
            return {
                ...prevState,
                customClientUri: validateUriString(value)
            };
        });
        if (value.length === 0) {
            setInputFields(prevState => {
                return {
                    ...prevState,
                    customClientUri: true
                };
            });
        }
    };

    const onStatusUpdate = statusObject => {
        setClientSettings(prevState => {
            return {
                ...prevState,
                [statusObject.identifier]: statusObject.value
            };
        });
    };

    const submitClientSettings = () => {
        const values = {
            ...clientSettings,
            clientHashedId: props.client.hashed_id
        };
        Inertia.post("/client-settings", values);
        props.toggleModal();
    };

    return (
        <div className="space-y-2">
            <div className="p-0 sm:p-2 space-y-6 text-sm sm:text-lg">
                <div>
                    <StringInput
                        value={clientSettings.identifier}
                        handleOnStringChange={e => updateName(e.target.value)}
                        title="Name"
                        placeholder="Smith, Jane | ID420 | Jane, Smith"
                    />
                    {clientSettings.identifier.length > 0 && (
                        <StringCounter
                            isValid={inputFields.name}
                            number={clientSettings.identifier.length}
                            max="25"
                        />
                    )}
                </div>
                <div>
                    <StringInput
                        value={clientSettings.customClientUri || ""}
                        handleOnStringChange={e =>
                            updateCustomUri(e.target.value)
                        }
                        title="Custom URI"
                        placeholder="Smith-Jane-10-Feb-1984 | 56056289"
                    />
                    {clientSettings.customClientUri &&
                        clientSettings.customClientUri.length > 0 && (
                            <div className="flex font-semibold items-center pt-2">
                                {inputFields.customClientUri ? (
                                    <StringCounter
                                        isValid={inputFields.customClientUri}
                                        number={
                                            clientSettings.customClientUri
                                                .length
                                        }
                                        max="50"
                                    />
                                ) : (
                                    <ErrorInput error="Error! Input needs to be a valid URI string (e.g., this-is-acceptable)." />
                                )}
                            </div>
                        )}
                </div>
                <div className="p-2 sm:p-4 sm:my-10 bg-gray-50 border rounded space-y-4 text-sm sm:text-lg">
                    <UpdateStatusForm
                        title="Client Status"
                        onStatusUpdate={onStatusUpdate}
                        currentStatus={clientSettings.active}
                        identifier="active"
                        truthyLabel="Active"
                        falseyLabel="Archived"
                    />
                    <UpdateStatusForm
                        title="URL Access"
                        onStatusUpdate={onStatusUpdate}
                        currentStatus={clientSettings.url}
                        identifier="url"
                        truthyLabel="Allowed"
                        falseyLabel="Disabled"
                    />
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
                <ButtonGray label="Close" handleClick={props.toggleModal} />
                {inputFields.validate() && (
                    <ButtonTeal
                        label="Update"
                        handleClick={submitClientSettings}
                    />
                )}
            </div>
        </div>
    );
}
