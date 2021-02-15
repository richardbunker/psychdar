import React, { useEffect, useState } from "react";

export default function SaveableBanner(props) {

    const [ time, setTime ] = useState('')

    useEffect(() => {
        displaySaved()
    }, [props.savedAt])
    
    const displaySaved = () => {
        setTime(prevState => {
            return prevState === '' ? '' : 'Saving...'
        })
        setTimeout(() => {
            setTime(props.savedAt)
        }, 300)
    }
    return (
        <div className="w-full rounded-t text-base font-bold text-gray-400 p-2 bg-white uppercase flex items-center justify-between">
            {props.title}
            <span className="text-sm italic normal-case pr-2">
                {time}
            </span>
        </div>
    );
}
