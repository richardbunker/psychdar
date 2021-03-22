import React from "react";
import RenderMeasure from "../../components/Models/Measure/components/Render/Measure";

export default function PreviewMeasure(props) {
    return (
        <div className="h-screen min-h-screen w-full max-w-6xl mx-auto overflow-auto">
            <RenderMeasure
                handleOnItemChange={() => console.log("Preview")}
                measure={props.measure}
                handleSubmit={() => console.log("Preview")}
            />
        </div>
    );
}
