import React, { useEffect, useState } from "react";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";

export default function ClientsContainer(props) {
    const [clients, setClients] = useState([]);
    const [filtered, setfiltered] = useState([]);

    useEffect(() => {
        setClients(props.clients);
        setfiltered(props.clients);
    }, [props.clients]);

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
        "text-white rounded py-2 px-3 flex items-center justify-center";

    const handleKeyUp = e => {
        filterClientsBySearch(e.target.value);
    };

    const noResults = () => {
        return (
            <div className={row + " bg-white uppercase font-semibold"}>
                No results
            </div>
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
                        className="min-w-max-content pr-4 hover:text-teal-500 hover:underline font-semibold"
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
            <div>
                <input
                    onKeyUp={handleKeyUp}
                    type="text"
                    placeholder="Search for a client"
                    className="mb-2 px-3 py-2 rounded shadow text-gray-600 text-xl w-full focus:outline-none"
                />
            </div>
            <div className="bg-white rounded-b">
                <GrayFadedBanner title="identifier" />
                <div className="w-full bg-white rounded overflow-auto">
                    <div className="min-w-min-content overflow-auto text-gray-600 text-lg w-full">
                        {filtered.length > 0 ? filterResults() : noResults()}
                    </div>
                </div>
            </div>
        </div>
    );
}
