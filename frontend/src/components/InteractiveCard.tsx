'use client'
import React from 'react';

export default function InteractiveCard( {children, contentName} : {children: React.ReactNode, contentName:string}) {
    
    function onCardSelected() {
        alert("You select " + contentName)
    }

    function onCardMouseAction(event: React.SyntheticEvent){
        if(event.type=='mouseover'){
        event.currentTarget.classList.remove('shadow-lg')
        event.currentTarget.classList.remove('bg-emerald-950')

        event.currentTarget.classList.add('shadow-2xl')
        event.currentTarget.classList.add('bg-emerald-700')
        }
        else {
        event.currentTarget.classList.remove('shadow-2xl')
        event.currentTarget.classList.remove('bg-emerald-700')

        event.currentTarget.classList.add('shadow-lg')
        event.currentTarget.classList.add('bg-emerald-950')
        }
    }

    return (
        <div className='w-full h-[300px] rounded-lg shadow-lg bg-emerald-950'
        onMouseOver={(e)=>onCardMouseAction(e)}
        onMouseOut={(e)=>onCardMouseAction(e)}
        >
            { children }
        </div>
    );
}