import { useEffect, useRef, useState } from "react";

export default (func: any, delay: number) => {
    const timeout = useRef<any>();
    return function executedFunc(...args: any) {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            func(...args);
            timeout.current = null;
        }, delay);
    };
}
