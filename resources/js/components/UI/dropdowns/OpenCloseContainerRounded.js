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
                    "flex items-center justify-between p-1 " +
                    (isOpen ? "" : "border border-gray-200 rounded")
                }
            >
                <div className="text-sm text-gray-500">{props.title}</div>
                <DropdownButton handleClick={toggleContainer} />
            </div>
            {isOpen && <div className="p-1">props.children</div>}
        </div>
    );
}
