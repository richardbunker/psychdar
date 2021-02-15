import React from "react";
import Spinner from "../../../UI/spinners/Spinner";

export default function ClinicTileLoading(props) {
    return (
        <div className={props.isLoading ? "w-full animate-pulse" : "hidden"}>
            <div
                style={{ height: 190 }}
                className="w-full p-6 rounded bg-white shadow flex flex-col space-y-4 items-center justify-center"
            >
                <div className="bg-gray-100 rounded-full p-4 h-20 w-20 flex items-center justify-center">
                    <Spinner size="40px" />
                </div>
                <div className="text-lg font-semibold text-gray-500 uppercase text-center">
                    {props.title}
                </div>
            </div>
        </div>
    );
}
