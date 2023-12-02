import type { Props } from 'astro';
import { useEffect, useState } from 'react'

type TypeWriterProps = {
    delay: number;
    text: string;
}

/* TODO:I want this to be where it takes in children elements but it was not working */

export default function TypeWriter({delay, text}: TypeWriterProps) {
    const [typed, setTyped] = useState('')

    useEffect(() => {
        const nextTyped = text.slice(0, typed.length + 1)

        if (typed === nextTyped) return

        const timeout = setTimeout(() => {
            setTyped(nextTyped)
            console.log(typed)
        }, delay)

        return () => clearTimeout(timeout)
    }, [typed]) 
    return (
        <h1>{typed}</h1>
    )
}