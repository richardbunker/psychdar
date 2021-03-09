import React from "react";
import RenderMeasure from "../../../../Measure/components/Render/Measure";

export default function PreviewBuilder(props) {
    const handleOnItemChange = value => {
        return;
    };
    return (
        <div className="absolute bg-gray-50 left-0 top-0 w-full z-10 h-screen overflow-auto">
            <div className="fixed p-6 right-0 top-0">
                <button
                    onClick={props.toggle}
                    className="bg-gray-400 hover:bg-teal-400 p-1 rounded-full shadow-md"
                >
                    <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div className="h-screen max-w-5xl mx-auto p-10">
                <RenderMeasure
                    handleOnItemChange={handleOnItemChange}
                    measure={props.measure}
                />
            </div>
        </div>
    );
}
