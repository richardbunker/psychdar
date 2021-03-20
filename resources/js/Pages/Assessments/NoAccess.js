import React from "react";

export default function NoAccess() {
    return (
        <div className="h-screen min-h-screen w-full bg-gray-800">
            <div className="h-full min-h-full flex items-center justify-center">
                <div className="p-10 m-10 rounded-md bg-white shadow-md flex items-center justify-center space-y-2">
                    <div className="text-center">
                        <div className="font-semibold text-4xl text-gray-700">
                            Oops...
                        </div>
                        <div className="text-gray-500 text-2xl py-2">
                            We're unable to do that!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
