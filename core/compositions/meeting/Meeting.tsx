import React, {ReactNode} from 'react';

interface IMeetingProps {

    children?: ReactNode
}

export const  Meeting = ({children}: IMeetingProps) => {



    return (
       <>
           {children}
       </>
    );
}
