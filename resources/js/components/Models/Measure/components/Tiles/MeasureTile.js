import React from "react";

export default function MeasureTile(props) {
    return (
        <div className={props.isLoading ? "hidden" : "w-full"}>
            <a
                href={"/measures/" + props.measure.hashed_id}
                style={{ height: 190 }}
                className="w-full p-6 rounded bg-white shadow flex flex-col space-y-4 items-center justify-center"
            >
                <div className="bg-gray-100 rounded-full">
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
                <div className="text-base font-semibold text-gray-500 text-center">
                    {props.measure.name}{" "}
                    <span className="uppercase">
                        {props.measure.abbreviation !== null
                            ? "(" + props.measure.abbreviation + ")"
                            : ""}
                    </span>
                </div>
            </a>
        </div>
    );
}
