import React from "react";
import { Helmet } from "react-helmet";

export default function MainContainer(props) {
    return (
        <>
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
            <div className="bg-gray-100 antialiased leading-none font-sans min-h-screen h-screen">
                <div className="flex w-full lg:flex-row flex-col">
                    {props.children}
                </div>
            </div>
        </>
    );
}
