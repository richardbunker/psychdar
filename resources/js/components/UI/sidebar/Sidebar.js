import React, { useState } from "react";
// import "./sidebar.css";

function Sidebar(props) {
    const [active, setActive] = useState(true);

    const handleClick = () => {
        setActive(prevState => (prevState = !prevState));
    };

    let toggle = "h-full sidenav ";

    if (active) {
        toggle += "open";
    } else {
        toggle += "close";
    }
    const tabActive = "ml-6 border-l-4 border-blue-300 pl-4 py-2 text-gray-200";
    const tabInActive =
        "ml-6 border-l-4 border-transparent pl-4 py-2 text-gray-500 hover:text-gray-300";

    return (
        <div className="h-full w-1/5">
            <div className={toggle}>
                <div
                    className="h-full py-4 text-base font-semibold flex flex-col bg-gray-900"
                    // style={{ width: "240px" }}
                >
                    <div className="font-semibold mb-2 pb-4 pt-2 px-5 text-2xl text-white">
                        Psychdar
                    </div>
                    <div
                        className={
                            props.tab === "dashboard" ? tabActive : tabInActive
                        }
                    >
                        <a href={"/dashboard"}>Dashboard</a>
                    </div>
                    <div
                        className={
                            props.tab === "clients" ? tabActive : tabInActive
                        }
                    >
                        <a href={"/clients"}>Clients</a>
                    </div>
                    <>
                        <div
                            className={
                                props.tab === "measures"
                                    ? tabActive
                                    : tabInActive
                            }
                        >
                            <a href={"/measures"}>Measures</a>
                        </div>
                    </>
                </div>
            </div>
            {/* <div className="fixed left-0 bottom-0 p-6">
                <div
                    className="bg-gray-300 p-2 rounded-full cursor-pointer shadow-md"
                    onClick={handleClick}
                >
                    <svg
                        className="w-6 h-6 text-gray-700"
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
                </div>
            </div> */}
        </div>
    );
}

export default Sidebar;
