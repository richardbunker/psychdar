import React, { useState } from "react";

export default function SaveSubmitButton(props) {
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        props.onHandleClick();
        setIsClicked(true);
    };
    return (
        <>
            {isClicked ? (
                <div className="w-24 bg-gradient-to-tl font-semibold from-teal-500 px-3 py-2 rounded text-white to-teal-400 uppercase animate-pulse cursor-wait">
                    Saving...
                </div>
            ) : (
                <button
                    onClick={handleClick}
                    className="w-24 bg-gradient-to-tl font-semibold from-green-500 px-3 py-2 rounded text-white to-green-400 uppercase"
                >
                    Save
                </button>
            )}
        </>
    );
}
