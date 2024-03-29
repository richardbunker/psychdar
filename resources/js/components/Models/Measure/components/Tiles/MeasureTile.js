import React from "react";

export default function MeasureTile(props) {
    return (
        <div className="w-full">
            <a
                href={"/measure/" + props.measure.hashed_id}
                style={{ height: 190 }}
                className="w-full p-6 bg-white flex flex-col space-y-4 items-center justify-center relative"
            >
                <div className="absolute m-2 p-2 right-0 top-0 space-y-1 text-center">
                    <div
                        className={
                            "p-2 rounded-full text-white uppercase text-sm font-semibold" +
                            (props.measure.is_published
                                ? " bg-green-400"
                                : " bg-gray-400")
                        }
                    >
                        {props.measure.is_published ? "Published" : "Draft"}
                    </div>
                    <div
                        className={
                            "p-2 rounded-full text-white uppercase text-sm font-semibold" +
                            (props.measure.is_private
                                ? " bg-purple-500"
                                : " bg-blue-400")
                        }
                    >
                        {props.measure.is_private ? "Private" : "Public"}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-full hover:bg-gray-100 border-2 border-gray-200">
                    <svg
                        className="p-4 w-20 h-20 text-teal-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="space-y-1">
                    <div className="text-lg font-semibold text-gray-500 text-center hover:text-gray-600">
                        {props.measure.name}
                    </div>
                </div>
            </a>
        </div>
    );
}
