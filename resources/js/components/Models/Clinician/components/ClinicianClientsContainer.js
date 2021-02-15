import React from "react";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";

export default function ClientsContainer(props) {
    const uri = props.owner === "admin" ? "/client/" : "/c/client/";

    const row = "p-2 flex items-center justify-between w-full rounded-b";

    const status = "text-white rounded py-1 px-2";

    return (
        <div className="w-full bg-white rounded">
            <GrayFadedBanner title="Clients" />
            <div className="text-lg text-gray-600">
                {props.clients.map((client, index) => {
                    return (
                        <div
                            key={client.hashed_id}
                            className={
                                index % 2
                                    ? row + " bg-teal-50"
                                    : row + " bg-white"
                            }
                        >
                            <a href={uri + client.hashed_id}>
                                <div className="hover:text-teal-500 hover:underline font-semibold">
                                    {client.last_name +
                                        ", " +
                                        client.first_name}
                                </div>
                            </a>
                            <div
                                className={
                                    client.is_active
                                        ? status + " bg-green-500"
                                        : status + " bg-gray-600"
                                }
                            >
                                {client.is_active ? "Active" : "Inactive"}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
