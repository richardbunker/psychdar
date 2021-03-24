import React from "react";
import GrayFadedBanner from "../GrayFadedBanner";
import EscapeKey from "../keys/Escape";

export default function ModalScrollable(props) {
    return (
        <div className="absolute bg-black bg-opacity-75 h-screen left-0 min-h-screen overflow-auto to-teal-400 top-0 w-full z-10">
            <EscapeKey function={props.toggle} />
            <div className="bg-white w-full relative h-auto  max-w-2xl mx-auto mt-10">
                <GrayFadedBanner title={props.heading} />
                <div className="p-4">{props.children}</div>
            </div>
        </div>
    );
}
