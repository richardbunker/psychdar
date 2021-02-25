import React from "react";

export default function MeasureTile(props) {
    return (
        <div className="w-full">
            <a
                href={"/measure/create"}
                style={{ height: 190 }}
                className="p-6 bg-teal-500 flex flex-col space-y-4 items-center justify-center"
            >
                <div className="bg-white rounded-full hover:bg-gray-100">
                    <svg
                        className="p-4 w-20 h-20 text-teal-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="text-lg font-semibold text-white text-center hover:text-gray-300">
                    Create New Measure
                </div>
            </a>
        </div>
    );
}
