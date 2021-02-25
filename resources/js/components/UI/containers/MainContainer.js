import React from "react";

export default function MainContainer(props) {
    return (
        <div className="bg-gray-100 antialiased leading-none font-sans flex flex-col min-h-screen">
            <div className="flex flex-1">{props.children}</div>
        </div>
    );
}
