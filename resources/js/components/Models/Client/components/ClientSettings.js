import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { validateString } from "../../../../utilities/HelperFunctions";
import StringInput from "../../../UI/inputs/StringInput";
import StringCounter from "../../../UI/inputs/StringCounter";
import UpdateStatusForm from "../../../UI/forms/UpdateStatusForm";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";

export default function ClientSettings(props) {
    const [clientSettings, setClientSettings] = useState({
        identifier: props.client.identifier,
        active: props.client.is_active,
        url: props.client.preferences.create_own_resources,
        stats: props.client.preferences.include_in_analyses
    });
    const [inputFields, setInputFields] = useState({
        name: true
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
            <div className="p-2 space-y-3 text-lg">
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
                <UpdateStatusForm
                    title="Statistical Analyses"
                    onStatusUpdate={onStatusUpdate}
                    currentStatus={clientSettings.stats}
                    identifier="stats"
                    truthyLabel="Included"
                    falseyLabel="Excluded"
                />
            </div>
            <div className="flex items-center justify-end space-x-2 w-80 ml-auto">
                <ButtonGray label="Close" handleClick={props.toggleModal} />
                {inputFields.name && (
                    <ButtonTeal
                        label="Update"
                        handleClick={submitClientSettings}
                    />
                )}
            </div>
        </div>
    );
}
