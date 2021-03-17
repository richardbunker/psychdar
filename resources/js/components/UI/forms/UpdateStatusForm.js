import React, { useState, useEffect } from "react";
import RadioPair from "../inputs/RadioPair";

export default function UpdateStatusForm(props) {
    const handleChange = e => {
        props.onStatusUpdate({
            identifier: props.identifier,
            value: e.target.value
        });
    };

    return (
        <form>
            <div className="flex items-center justify-between w-full">
                <div>
                    <div className="text-gray-600">{props.title}</div>
                </div>
                <RadioPair
                    handleChange={handleChange}
                    status={props.currentStatus}
                    truthyLabel={props.truthyLabel}
                    falseyLabel={props.falseyLabel}
                />
            </div>
        </form>
    );
}
