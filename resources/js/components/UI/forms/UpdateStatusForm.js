import React, { useState, useEffect } from "react";
import RadioPair from "../inputs/RadioPair";

export default function UpdateStatusForm(props) {
    const [status, setStatus] = useState();

    useEffect(() => {
        setStatus(props.currentStatus);
    }, [props.currentStatus]);

    const handleChange = e => {
        setStatus(e.target.value);
        props.onStatusUpdate(props.identifier, e.target.value);
    };

    return (
        <form>
            <div className="flex items-center justify-between w-full">
                <div>
                    <div className="text-gray-600 font-bold">{props.title}</div>
                </div>
                <RadioPair
                    handleChange={handleChange}
                    status={status}
                    truthyLabel={props.truthyLabel}
                    falseyLabel={props.falseyLabel}
                />
            </div>
        </form>
    );
}
