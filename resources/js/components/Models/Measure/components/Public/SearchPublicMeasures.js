import Axios from "axios";
import React, { useState } from "react";
import ButtonGray from "../../../../UI/buttons/ButtonGray";
import ModalScrollable from "../../../../UI/modals/Scrollable";
import PublicMeasureContainer from "./PublicMeasureContainer";

export default function SearchPublicMeasuers(props) {
    const [publicMeasures, setPublicMeasures] = useState([]);
    const [userMeasures, setUserMeasures] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [displayPublicMeasures, setDisplayPublicMeasures] = useState(false);
    const [
        displayPublicMeasuresContainer,
        setDisplayPublicMeasuresContainer
    ] = useState(false);

    const displayAndFetchPublicMeasures = () => {
        toggleDisplayPublicMeasures();
        fetchPublicMeasures();
    };

    const toggleDisplayPublicMeasures = () => {
        setDisplayPublicMeasures(prevState => !prevState);
    };

    const fetchPublicMeasures = () => {
        Axios.get("/public-measures/").then(res => {
            const { publicMeasures, userMeasures } = res.data;
            setPublicMeasures(publicMeasures);
            setUserMeasures(userMeasures);
        });
    };

    const filterMeasuresBySearch = searchTerm => {
        const filteredMeasures = publicMeasures.filter(measure => {
            return measure.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
        setFiltered(filteredMeasures);
    };

    const handleKeyUp = e => {
        if (e.target.value.length > 0) {
            setDisplayPublicMeasuresContainer(true);
        } else {
            setDisplayPublicMeasuresContainer(false);
        }
        filterMeasuresBySearch(e.target.value);
    };

    const filterResults = () => {
        return filtered.map((publicMeasure, index) => {
            return (
                <PublicMeasureContainer
                    toggleModal={toggleDisplayPublicMeasures}
                    key={index}
                    index={index}
                    publicMeasure={publicMeasure}
                    userMeasureHashedIds={userMeasures.map(userMeasure => {
                        return userMeasure.hashed_id;
                    })}
                />
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
                        <div className="my-2">
                            {displayPublicMeasuresContainer &&
                                (filtered.length > 0 ? (
                                    <div className="border border-teal-100">
                                        {filterResults()}
                                    </div>
                                ) : (
                                    <div className="font-semibold px-2 text-gray-400 text-lg">
                                        No results.
                                    </div>
                                ))}
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
