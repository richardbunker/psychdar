import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import ButtonBlue from "../../../UI/buttons/ButtonBlue";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import GrayFadedMenuBanner from "../../../UI/GrayFadedMenuBanner";
import StringInput from "../../../UI/inputs/StringInput";
import ModalScrollable from "../../../UI/modals/Scrollable";
import { validateString } from "../../../../utilities/HelperFunctions";
import StringCounter from "../../../UI/inputs/StringCounter";

export default function ClientsContainer(props) {
    const [clients, setClients] = useState([]);
    const [filtered, setfiltered] = useState([]);
    const [displayCreateClientModal, setDisplayCreateClientModal] = useState(
        false
    );
    const [newClient, setNewClient] = useState("");
    const [inputFields, setInputFields] = useState({
        name: false
    });

    useEffect(() => {
        setClients(props.clients);
        setfiltered(props.clients);
    }, [props.clients]);

    const toggleCreateClientModal = () => {
        setDisplayCreateClientModal(prevState => !prevState);
    };

    const updateName = value => {
        if (value.length <= 25) {
            setNewClient(value);
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

    const submitCreateClient = () => {
        const values = {
            name: newClient
        };
        Inertia.post("/clients", values);
        toggleCreateClientModal();
    };

    const filterClientsBySearch = searchTerm => {
        const filteredClients = clients.filter(client => {
            return client.identifier
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
        setfiltered(filteredClients);
    };

    const row = "p-2 flex items-center justify-between w-full rounded-b";

    const bubble =
        "text-white rounded py-1 px-3 flex items-center justify-center text-xs sm:text-sm uppercase";

    const handleKeyUp = e => {
        filterClientsBySearch(e.target.value);
    };

    const noResults = () => {
        return (
            <div className={row + " bg-white uppercase py-2"}>No results</div>
        );
    };

    const filterResults = () => {
        return filtered.map((client, index) => {
            return (
                <div
                    key={client.hashed_id}
                    className={
                        index % 2 ? row + " bg-teal-50" : row + " bg-white"
                    }
                >
                    <a
                        href={"client/" + client.hashed_id}
                        className="min-w-max-content pr-4 hover:text-teal-500 hover:underline py-1"
                    >
                        {client.identifier}
                    </a>
                    <div className="space-x-2 flex items-center justify-end text-center min-w-max-content font-semibold">
                        <div
                            className={
                                client.is_active
                                    ? bubble + " bg-green-400"
                                    : bubble + " bg-gray-500"
                            }
                        >
                            {client.is_active ? "Active" : "Archived"}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            {displayCreateClientModal && (
                <ModalScrollable
                    toggle={toggleCreateClientModal}
                    heading="Create Client"
                >
                    <div className="pb-4">
                        <StringInput
                            shouldInputBeFocused={true}
                            value={newClient}
                            handleOnStringChange={e =>
                                updateName(e.target.value)
                            }
                            title="Name"
                            placeholder="Smith, Jane | ID420 | Jane, Smith"
                        />
                        {newClient.length > 0 && (
                            <StringCounter
                                isValid={inputFields.name}
                                number={newClient.length}
                                max="25"
                            />
                        )}
                    </div>
                    <div className="flex items-center justify-end space-x-2 w-80 ml-auto">
                        <ButtonGray
                            label="Cancel"
                            handleClick={toggleCreateClientModal}
                        />
                        {inputFields.name && (
                            <ButtonTeal
                                label="Create"
                                handleClick={submitCreateClient}
                            />
                        )}
                    </div>
                </ModalScrollable>
            )}
            <input
                onKeyUp={handleKeyUp}
                type="text"
                placeholder="Search..."
                className="focus:outline-none py-3 px-3 text-base sm:text-lg text-gray-700 w-full"
            />
            <div className="bg-white">
                <GrayFadedMenuBanner title="Identifier">
                    <ButtonBlue
                        handleClick={toggleCreateClientModal}
                        label="Create"
                    />
                </GrayFadedMenuBanner>
                <div className="w-full bg-white rounded overflow-auto">
                    <div className="min-w-min-content overflow-auto text-gray-600 text-sm sm:text-lg w-full">
                        {filtered.length > 0 ? filterResults() : noResults()}
                    </div>
                </div>
            </div>
        </div>
    );
}
