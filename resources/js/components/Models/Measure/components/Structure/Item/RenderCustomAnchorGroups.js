import React, { useEffect, useState } from "react";

export default function RenderCustomAnchorGroups(props) {
    const [anchorGroups, setAnchorGroups] = useState([]);
    const [filtered, setfiltered] = useState([]);
    const [displayResults, setDisplayResults] = useState(false);

    const row =
        "p-2 flex items-center justify-between w-full hover:bg-teal-200";

    useEffect(() => {
        fetchAnchorGroups();
    }, [props]);

    const filterBySearch = searchTerm => {
        const filtered = anchorGroups.filter(anchorGroup => {
            return anchorGroup.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
        setfiltered(filtered);
    };

    const fetchAnchorGroups = () => {
        axios
            .get("/api/anchor-groups/" + props.type)
            .then(response => {
                setAnchorGroups(response.data);
                setfiltered(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleKeyUp = e => {
        filterBySearch(e.target.value);
        setDisplayResults(true);
    };

    const noResults = () => {
        return <div className={row + " bg-white uppercase"}>No results</div>;
    };

    const filterResults = () => {
        return filtered.map((anchorGroup, index) => {
            return (
                <div
                    key={anchorGroup.hashed_id}
                    className={
                        index % 2 ? row + " bg-gray-50" : row + " bg-white"
                    }
                >
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            setDisplayResults(false);
                            props.onSelectedCustomAnchorGroup(anchorGroup);
                        }}
                    >
                        {anchorGroup.name}
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="flex items-start pt-6 space-x-2 w-full">
            <div className="text-gray-600 font-semibold w-1/3 py-2">
                Anchors
            </div>
            <div className="w-full">
                <div className="pb-3">
                    <input
                        onKeyUp={handleKeyUp}
                        type="text"
                        placeholder="Search anchors..."
                        className="px-3 py-2 rounded shadow text-gray-600 w-full focus:outline-none"
                    />
                </div>
                {displayResults && (
                    <div className="border max-h-32 overflow-auto text-gray-600 w-full">
                        {filtered.length > 0 ? filterResults() : noResults()}
                    </div>
                )}
            </div>
        </div>
    );
}
