import React from "react";

export default function AssessmentComplete() {
    return (
        <div className="h-screen min-h-screen w-full max-w-6xl mx-auto xl:pt-10 bg-gradient-to-tr from-pink-500 to-purple-500">
            <div className="h-full min-h-full flex items-center justify-center">
                <div className="p-10 m-10 rounded-md bg-white shadow-md flex items-center justify-center space-y-2">
                    <div className="text-center">
                        <div className="text-6xl">🎉🎉🎉</div>
                        <div className="font-semibold text-4xl text-gray-700">
                            Thank you
                        </div>
                        <div className="text-gray-500 text-xl py-2">
                            You may now close this window.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
