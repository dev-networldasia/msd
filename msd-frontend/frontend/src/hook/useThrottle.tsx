import { useRef } from "react";

export default (fn: any, ms: number) => {
    const lastCall = useRef(0);
    return function (...args: any) {
        const now = new Date().getTime();
        if (now - lastCall.current < ms) {
            return;
        }
        lastCall.current = now;
        return fn(...args);
    };
}