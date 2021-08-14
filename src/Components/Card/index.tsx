import React from 'react'

const Card:React.FC<any> = (props:any) => {

    const dragStart = (e:any) => {
        const target = e.target;
        e.dataTransfer.setData('card_id', target.id);

        setTimeout(() => {
            target.style.display = "none";
        }, 0);
    }


    

    const myRef: React.RefObject<HTMLDivElement> = React.createRef();

    return(
        <div
            ref = {myRef}
            id={props.id}
            className = {props.className}
            draggable = {props.draggable}
            // onDrop = {drop} 
            onDragStart = {dragStart}
            
        >
            {props.children}
        </div>
    )
}

export default Card