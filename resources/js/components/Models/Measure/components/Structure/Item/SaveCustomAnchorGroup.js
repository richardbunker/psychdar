import React, { useState } from "react";
import StringCounter from "../../../../../UI/inputs/StringCounter";

export default function SaveCustomAnchorGroup(props) {
    const [displayForm, setDisplayForm] = useState(false);
    const [processComplete, setProcessComplete] = useState(false);
    const [name, setName] = useState("");

    const [inputFields, setInputFields] = useState({
        name: false
    });

    const updateName = string => {
        if (string.length <= 25) {
            setName(string);
        }
        if (string.length >= 2) {
            setInputFields(prevState => {
                return { ...prevState, name: true };
            });
        } else {
            setInputFields(prevState => {
                return { ...prevState, name: false };
            });
        }
    };

    const toggleForm = () => {
        setDisplayForm(prevState => !prevState);
        setName("");
    };

    const submit = () => {
        const newGroup = {
            name: name,
            type: props.type,
            anchors: props.anchors
        };
        axios
            .post("/api/anchor-group/create", {
                anchor_group: newGroup
            })
            .then(response => {
                console.log(response.data);
                setProcessComplete(true);
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <>
            {processComplete ? (
                <div
                    onClick={toggleForm}
                    className="bg-teal-400 font-semibold px-3 py-3 rounded text-base text-center text-white uppercase"
                >
                    DONE
                </div>
            ) : (
                <div className="">
                    {!displayForm && (
                        <div
                            onClick={toggleForm}
                            className="bg-gray-400 cursor-pointer flex font-semibold items-center justify-between px-3 py-1 rounded text-sm space-x-1 text-center text-white uppercase"
                        >
                            <div>{"save as".replace(/ /g, "\u00a0")}</div>
                            <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                    )}
                    {displayForm && (
                        <>
                            <div className="flex items-start justify-end space-x-2">
                                <div>
                                    <input
                                        value={name}
                                        onChange={e =>
                                            updateName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Name"
                                        className="px-3 py-2 rounded shadow text-gray-600 text-base w-full focus:outline-none"
                                    />
                                    <StringCounter
                                        isValid={inputFields.name}
                                        number={name.length}
                                        max="25"
                                    />
                                </div>
                                <button onClick={toggleForm}>
                                    <svg
                                        className="w-8 h-8 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {inputFields.name && (
                                    <button onClick={submit}>
                                        <svg
                                            className="w-8 h-8 text-teal-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
