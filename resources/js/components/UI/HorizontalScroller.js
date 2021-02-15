import React from "react";

export default function HorziontalScroller(props) {
    return (
        <div className="overflow-auto">
            <div className="inline-flex space-x-2 m-2">
                {props.children}
            </div>
        </div>
    );
}
