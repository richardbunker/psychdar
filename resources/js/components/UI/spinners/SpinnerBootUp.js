import React from "react";
import LargeSpinner from "./LargeSpinner";

export const spinnerBootUp = () => {
    return (
        <div className="flex items-center justify-center pt-52">
            <LargeSpinner size="100px" />
        </div>
    );
};
