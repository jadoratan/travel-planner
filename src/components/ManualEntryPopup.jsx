import { useEffect, useRef } from 'react';

export default function ManualEntryPopup({isOpen, onClose, title, inputs}){

    //useRef helps close the <dialog> / popup modal which is hidden initially
    const popupRef = useRef(null);

    useEffect(() => {
        const popup = popupRef.current;

        if(!popup){   return;  }

        if (isOpen){
            popup.showModal();
        }
        else{
            popup.close();
        }

    }, [isOpen]); //useEffect() runs when isOpen changes


    return(
        <dialog
            ref = {popupRef}
            onClose = {onClose}
        >   
            <h2>{title}</h2>
            {inputs.map((input, i) => (<div><input key = {i} placeholder = {input}/></div>))}
            <button onClick={onClose}>done!</button>
        </dialog>
    );
}
