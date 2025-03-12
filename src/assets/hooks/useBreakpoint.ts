import { useState, useEffect } from 'react';

//Egen hook
const useBreakpoint = (breakpoint: number) => {
    //State som håller koll på om fönstret är större än breakpoint
    const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(window.innerWidth > breakpoint);

    //Kollar om fönstret är större än breakpoint
    useEffect(() => {
        const handleResize = () => {
            setIsAboveBreakpoint(window.innerWidth > breakpoint);
        };

        // Lägg till event listener
        window.addEventListener('resize', handleResize);

        // Ta bort event listener vid unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    //True eller false
    return isAboveBreakpoint;
};

export default useBreakpoint;
