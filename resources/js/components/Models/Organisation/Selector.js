import React from "react";

function SelectOrganisation(props) {       
    const selectOptions = props.organisations.map(org => {
        return (
            <option className="overflow-hidden" key={org.hashed_id} value={org.hashed_id}>
                {org.name}
            </option>
        );
    });
    return (
        <div className={props.organisations.length > 0 ? "" : "hidden"}>
            <div className="relative w-62">
                <select
                    onChange={e => props.handleChange(e)}
                    className="text-gray-500 overflow-hidden block border appearance-none w-full py-1 px-2 rounded text-sm leading-normal"
                >
                    {selectOptions}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                        className="fill-current h-4 w-4 bg-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default SelectOrganisation;
