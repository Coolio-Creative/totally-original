import React, { useEffect, useState } from 'react'

type TypeWriterProps = {
    delay: number;
    text: string;
}

/* TODO:I want this to be where it takes in children elements but it was not working */

export const TypeWriter = ({delay, text}: TypeWriterProps) => {
    const [typed, setTyped] = useState('')
    
    const cursor = "▮";

    let cursorSpan = document.createElement('span');
    cursorSpan.innerText = cursor;

    cursorSpan.className = "cursor";
    
    useEffect(() => {
        const nextTyped = text.slice(0, typed.length + 1)

        if (typed === nextTyped) return
        cursorSpan.className = "";
        const timeout = setTimeout(() => {
            setTyped(nextTyped)

        }, delay)
        return () => clearTimeout(timeout)
    }, [typed])
    return (
        <h1>{typed}{cursorSpan}</h1>
    );
}