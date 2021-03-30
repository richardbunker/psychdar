import React, { useState } from "react";
import DropdownButton from "../buttons/DropdownButton";

export default function OpenCloseContainerRounded(props) {
    const [isOpen, setIsOpen] = useState(props.isOpen);

    const toggleContainer = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div
            className={
                "bg-white " + (isOpen ? " border border-gray-200 rounded" : "")
            }
        >
            <div
                className={
                    "flex items-center justify-between p-2 " +
                    (isOpen ? "" : "border border-gray-200 rounded")
                }
            >
                <div className="text-base text-gray-500 font-semibold">
                    {props.title}
                </div>
                <DropdownButton
                    toggle={toggleContainer}
                    isOpen={isOpen}
                    handleClick={toggleContainer}
                />
            </div>
            {isOpen && props.children}
        </div>
    );
}
