import React from "react";

export default function AssessmentComplete() {
    return (
        <div className="h-screen min-h-screen w-full max-w-6xl mx-auto xl:pt-10">
            <div className="h-full min-h-full flex items-center justify-center">
                <div className="p-10 rounded bg-white shadow flex items-center justify-center space-y-2">
                    <div className="text-center">
                        <div className="font-semibold text-3xl text-gray-700">
                            Thank you
                        </div>
                        <div className="text-gray-500">
                            Please close this window.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
