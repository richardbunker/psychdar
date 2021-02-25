import React from "react";

export default function ScrollableScreenContainer(props) {
    return (
        <div className="h-screen min-h-screen overflow-auto w-full border-t-4 border-teal-400">
            {props.children}
        </div>
    );
}
