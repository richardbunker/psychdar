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
                <div className="w-full text-center font-semibold px-3 py-2 rounded text-white bg-teal-400 uppercase animate-pulse cursor-wait">
                    Saving...
                </div>
            ) : (
                <button
                    onClick={handleClick}
                    className="w-full text-center font-semibold hover:bg-teal-500 px-3 py-2 rounded text-white bg-teal-400 uppercase"
                >
                    {props.label}
                </button>
            )}
        </>
    );
}
