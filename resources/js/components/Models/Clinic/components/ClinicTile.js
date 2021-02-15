import React from "react"

export default function clinicTile(props) {
    return (
        <div className={props.isLoading ? "hidden" : "w-full"}>
            <a href={"/clinic/" + props.clinic.hashed_id}
                style={{ height: 190 }}
                className="w-full p-6 rounded bg-white shadow flex flex-col space-y-4 items-center justify-center"
            >
                <div className="bg-gray-100 rounded-full">
                    {props.isClinic ? (
                        <svg
                            className="p-3 w-20 h-20 text-teal-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    ) : (
                        <svg
                            className="w-20 h-20 text-teal-400"
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
                    {props.clinic.name}
                </div>
            </a>
        </div>
    );
}