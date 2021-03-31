import React, { useState } from "react";
import DropdownButton from "../buttons/DropdownButton";

export default function OpenCloseContainer(props) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleContainer = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="bg-white relative">
            <div className="flex items-center justify-between p-2">
                <div>
                    <span className="text-sm sm:text-base text-gray-500 font-semibold">
                        {props.title}
                    </span>
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
