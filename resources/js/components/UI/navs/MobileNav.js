import React, { useState } from "react";
import Logo from "../logo/logo";

export default function MobileNav(props) {
    const [displayMenu, setDisplayMenu] = useState(false);

    const toggleMenu = () => {
        setDisplayMenu(prevState => !prevState);
    };
    const tabActive = "ml-6 border-l-4 border-teal-400 pl-4 py-2 text-gray-200";
    const tabInActive =
        "ml-6 border-l-4 border-transparent pl-4 py-2 text-gray-500 hover:text-gray-300";
    return (
        <>
            <div className="lg:hidden block fixed bottom-0 left-0 m-0 p-6 z-10">
                <button
                    onClick={() => toggleMenu()}
                    className="bg-teal-400 rounded-full shadow-md p-2"
                >
                    <svg
                        className="w-8 h-8 text-gray-100"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {displayMenu && (
                <div className="lg:hidden flex items-start justify-start absolute top-0 left-0 m-0 p-6 z-20 w-full h-screen min-h-screen bg-gray-900">
                    <div className="absolute bottom-0 left-0 m-0 p-6">
                        <button
                            onClick={() => toggleMenu()}
                            className="bg-gray-400 rounded-full shadow-lg p-2"
                        >
                            <svg
                                className="w-8 h-8 text-gray-100"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="h-full py-4 text-3xl font-semibold flex flex-col my-6 space-y-6">
                        <Logo />
                        <div
                            className={
                                props.tab === "dashboard"
                                    ? tabActive
                                    : tabInActive
                            }
                        >
                            <a href={"/dashboard"}>Dashboard</a>
                        </div>
                        <div
                            className={
                                props.tab === "clients"
                                    ? tabActive
                                    : tabInActive
                            }
                        >
                            <a href={"/clients"}>Clients</a>
                        </div>
                        <div
                            className={
                                props.tab === "measures"
                                    ? tabActive
                                    : tabInActive
                            }
                        >
                            <a href={"/measures"}>Measures</a>
                        </div>
                        <div className={tabInActive + " mt-4"}>
                            <a href={"/logout"}>Logout</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
