import React from "react";

export default function ClinicianTile(props) {
    return (
        <div className={props.isLoading ? "hidden" : "w-full"}>
            <a
                href={"/clinician/" + props.clinician.hashed_id}
                style={{ height: 190 }}
                className="cursor-pointer w-full p-6 rounded bg-white shadow flex flex-col space-y-4 items-center justify-center"
            >
                <div className="bg-gray-100 rounded-full">
                    {props.isClinician ? (
                        <svg
                            className="p-3 w-20 h-20 text-blue-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-20 h-20 text-blue-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </div>
                <div className="text-lg font-semibold text-gray-500 uppercase text-center">
                    {props.clinician.first_name + " " + props.clinician.last_name}
                </div>
            </a>
        </div>
    );
}
