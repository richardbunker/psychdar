import React from "react";
import CircularCancelButton from "../buttons/CircularCancelButton";

export default function ModalCentered(props) {
    return (
        <div className="absolute top-0 left-0 z-10 bg-black bg-opacity-75 h-screen w-full">
            <div className="flex items-center justify-center w-full h-full">
                <div
                    className={
                        "bg-white rounded shadow w-full max-w-xl p-4 relative"
                    }
                >
                    <div className="absolute m-2 right-0 top-0">
                        <CircularCancelButton
                            handleOnClick={props.toggleModal}
                        />
                    </div>
                    <div className="text-3xl text-gray-700 font-bold pb-2">
                        {props.heading}
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
