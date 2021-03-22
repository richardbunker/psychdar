import React, { useEffect, useState } from "react";
import StringCounter from "../../../../UI/inputs/StringCounter";
import TextInput from "../../../../UI/inputs/TextInput";

export default function DetailsBuilder(props) {
    const [details, setDetails] = useState({
        author: ""
    });

    useEffect(() => {
        if (props.measure.details) {
            setDetails(props.measure.details);
        }
    }, []);

    const [inputFields, setInputFields] = useState({
        author: true,
        validate() {
            return this.author;
        }
    });

    const updateAuthor = string => {
        if (string.length <= 400) {
            setDetails(prevState => {
                return {
                    author: string
                };
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <TextInput
                    value={details.author === null ? "" : details.author}
                    title="Author & Reference"
                    placeholder="Lovibond, S.H. & Lovibond, P.F. (1995).  Manual for the Depression Anxiety Stress Scales. (2nd. Ed.)  Sydney: Psychology Foundation."
                    handleOnTextChange={e => updateAuthor(e.target.value)}
                />
                <StringCounter
                    number={details.author === null ? 0 : details.author.length}
                    max="400"
                    isValid={true}
                />
            </div>
            {inputFields.validate() && (
                <div className="w-full flex items-center justify-end space-x-2">
                    <button
                        onClick={() => props.toggleModal()}
                        className="font-semibold bg-gray-400 px-3 py-2 rounded text-white hover:bg-gray-500 uppercase hover:shadow"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => props.onDetailsSubmit(details)}
                        className="font-semibold bg-blue-400 px-3 py-2 rounded text-white hover:bg-blue-500 uppercase hover:shadow hover:text-gray-200"
                    >
                        Update
                    </button>
                </div>
            )}
        </div>
    );
}
