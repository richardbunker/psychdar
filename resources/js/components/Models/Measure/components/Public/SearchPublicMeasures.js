import Axios from "axios";
import React, { useState } from "react";
import ButtonBlue from "../../../../UI/buttons/ButtonBlue";
import ButtonGray from "../../../../UI/buttons/ButtonGray";
import ModalScrollable from "../../../../UI/modals/Scrollable";

export default function SearchPublicMeasuers(props) {
    const [measures, setMeasures] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [displayPublicMeasures, setDisplayPublicMeasures] = useState(false);

    const removeUserMeasures = ({ publicMeasures, authUserMeasures }) => {
        let addableMeasures = [];
        authUserMeasures.forEach(authUserMeasure => {
            addableMeasures = publicMeasures.filter(
                publicMeasure =>
                    publicMeasure.hashed_id !== authUserMeasure.hashed_id
            );
        });
        setMeasures(addableMeasures);
    };

    const displayAndFetchPublicMeasures = () => {
        toggleDisplayPublicMeasures();
        fetchPublicMeasures();
    };

    const toggleDisplayPublicMeasures = () => {
        setDisplayPublicMeasures(prevState => !prevState);
    };

    const fetchPublicMeasures = () => {
        Axios.get("/public-measures/").then(res => {
            removeUserMeasures(res.data);
        });
    };

    const filterMeasuresBySearch = searchTerm => {
        const filteredMeasures = measures.filter(measure => {
            return measure.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
        setFiltered(filteredMeasures);
    };

    const handleKeyUp = e => {
        filterMeasuresBySearch(e.target.value);
    };

    const row = "flex items-center justify-between p-2 border rounded";

    const filterResults = () => {
        return filtered.map((measure, index) => {
            return (
                <div
                    key={measure.hashed_id}
                    className={
                        index % 2 ? row + " bg-teal-50" : row + " bg-white"
                    }
                >
                    <div className="text-gray-500 text-base font-semibold">
                        {measure.name}
                    </div>
                    <ButtonBlue
                        handleClick={console.log("aoeu")}
                        label="Add Measure"
                    />
                </div>
            );
        });
    };
    return (
        <div className="flex w-full">
            {displayPublicMeasures && (
                <ModalScrollable heading="Community Measures">
                    <div>
                        <input
                            autoFocus={true}
                            onKeyUp={handleKeyUp}
                            type="text"
                            placeholder="Search community measures..."
                            className="focus:outline-none p-2 text-lg text-gray-700 w-full border-b"
                        />
                        <div className="py-2 space-y-2">
                            {filtered.length > 0 ? filterResults() : ""}
                        </div>
                        <div className="flex items-center justify-end">
                            <ButtonGray
                                handleClick={toggleDisplayPublicMeasures}
                                label="Cancel"
                            />
                        </div>
                    </div>
                </ModalScrollable>
            )}
            <div
                onClick={displayAndFetchPublicMeasures}
                className="px-2 py-3 text-lg text-gray-500 w-full cursor-text"
            >
                Search community measures...
            </div>
        </div>
    );
}
