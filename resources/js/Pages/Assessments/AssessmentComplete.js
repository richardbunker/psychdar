import React from "react";
import { Helmet } from "react-helmet";

export default function AssessmentComplete() {
    return (
        <div className="h-screen min-h-screen w-full bg-gray-800">
            <Helmet>
                <title>Thank you</title>
            </Helmet>
            <div className="h-full min-h-full flex items-center justify-center">
                <div className="p-10 m-10 rounded-md bg-white shadow-md flex items-center justify-center space-y-2">
                    <div className="text-center">
                        <div className="font-semibold text-4xl text-gray-700">
                            Thank you
                        </div>
                        <div className="text-gray-500 text-2xl py-2">
                            You may now close this window.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
