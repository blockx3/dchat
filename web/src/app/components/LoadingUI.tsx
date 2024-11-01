"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function LoadingUI() {
    const [progress, setProgress] = React.useState(5)

    React.useEffect(() => {
        const timers = [
            setTimeout(() => setProgress(33), 500),
            setTimeout(() => setProgress(66), 1500),
            setTimeout(() => setProgress(85), 2000),
        ]
        return () => timers.forEach(timer => clearTimeout(timer))
    }, [])

    return <Progress value={progress} className="w-[60%]" />
}
