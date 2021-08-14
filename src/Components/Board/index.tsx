import React, {useState, useRef, useEffect, RefObject} from 'react';
import initialData from '../../inital-data';

interface Position{
    id:string;
    positionOX:number;
    positionOY:number;
    width:number;
    height:number;
}


// const fillingCard = [
//     {id : "card-1", text : "esse"},
//     {id : "card-2", text : "esst",},
//     {id : "card-3", text : "brot",},
//     {id : "card-4", text : "essen"},
//     {id : "card-5", text : "apfel",},
//     {id : "card-6", text : "sie",},
//     {id : "card-7", text : "und"},
//     {id : "card-8", text : "hello",},
//     {id : "card-9 ", text : "isst",},
//     {id : "card-10", text : "einen",},
//     {id : "card-11 ", text : "sie",}
// ]

function Board(props:any){  

    const myRef: RefObject<HTMLDivElement> = useRef<null | HTMLDivElement>(null);

    const [soursePosition, setSoursePosition] = useState<Position[]>([])

    let currentPosition = soursePosition;
    useEffect(()=>{
        if(myRef.current !== null) {
            const initialDataCard:Position[] = Object.values(myRef.current.children).map((item:any)=>{
                return {
                    id:item.id,
                    positionOX: item.offsetLeft - item.parentElement.offsetLeft,
                    positionOY:item.offsetTop - item.parentElement.offsetTop,
                    width:item.clientWidth,
                    height:item.clientHeight
                }
            })
            setSoursePosition(initialDataCard)
        }
    },[myRef])
    const drop = (e:any) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card:any = document.getElementById(card_id);
        let isDrop:boolean = false;
        if (myRef.current !== null){
            Object.values(myRef.current.children).map((item:any)=>{
                if (!isDrop){
                    if (item.className == 'card moveElement'){
                        item.classList.remove('moveElement')
                        item.before(card)
                        card.style.display="block"
                        isDrop = true;
                    }else if (item.className == 'card newLine'){
                        item.classList.remove('newLine')
                        item.after(card)
                        card.style.display="block"
                        isDrop = true;
                    }
                }
            })
        }
        if(!isDrop){
            e.target.appendChild(card);
            card.style.display="block"
            isDrop = true;
        }
    }

    

    return (
        <div
            id={props.id}
            className = {props.className}
            // onDragOver = {dragOver}
            ref = {myRef}
            onDrop = {drop}
            >
            {props.children}
        </div>
    )
}
export default Board;