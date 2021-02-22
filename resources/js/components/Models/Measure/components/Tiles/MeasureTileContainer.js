import React from "react";
import MeasureTile from "./MeasureTile";
import CreateMeasureTile from "./CreateMeasureTile";

export default function MeasureTileContainer(props) {
    const measures = props.measures.map(measure => (
        <MeasureTile
            key={measure.hashed_id}
            isLoading={props.isLoading}
            isMeasure={true}
            measure={measure}
        />
    ));
    return (
        <div className="space-y-4">
            <CreateMeasureTile />
            {measures}
        </div>
    );
}
