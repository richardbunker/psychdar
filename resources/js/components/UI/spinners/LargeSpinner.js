import React from "react";
import "./spinner.css";

export default function SpinnerLarge(props) {
    return (
        <div
            style={{ width: props.size, height: props.size }}
            className="spinner-large"
        ></div>
    );
}
