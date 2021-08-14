


import React, {useState, useRef, useEffect, RefObject} from 'react';
import initialData from '../../inital-data';
import Board from '../Board';
import CheckBoard from '../CheckBoard';
// interface Position{
//     id:string;
//     length:number;
// }

interface Position{
    id:string;
    positionOX:number;
    positionOY:number;
    width:number;
    height:number;
}
function Hollow(props:any){
    const [arrayCard, setArrayCard] = useState<Position[]>([])

    const myRef: RefObject<HTMLDivElement> = useRef<null | HTMLDivElement>(null);

    const [soursePosition, setSoursePosition] = useState<Position[]>([])

    let currentPosition = soursePosition;
    useEffect(()=>{
        if(myRef.current !== null) {
            const initialDataCard:Position[] = Object.values(myRef.current.children[0].children).map((item:any)=>{
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
        const card_id = e.dataTransfer.getData('card_id');
        const card:any = document.getElementById(card_id);

        
        var target = e.target.closest(`#${e.target.id}`);
        var targetCoords = target.getBoundingClientRect();
        var xCoord = e.clientX - targetCoords.left;
        var yCoord = e.clientY - targetCoords.top;
        let isDrop = true;
        if(myRef.current !== null) {
            if (e.target.id === 'hollow' || e.target.parentElement.id === "chboard" && e.target.className === "card"){
                myRef.current.children[1].append(card)
                 card.style.display = "block"
            }
        }
        // if(e.target.className === 'board'){
        //     arrayCard.forEach((item: Position, index:number) => {
        //         if (isDrop){
        //             if (xCoord < item.length){
        //                 document.querySelector(`#${item.id}`)?.setAttribute('style','margin-left:10px')
        //                 document.querySelector(`#${item.id}`)?.before(card)
        //                 isDrop = false;
        //             }
        //         }
        //     })
        // }

        // if (e.target.className === 'board'){
        //     e.target.appendChild(card);
        // }else if (e.target.className === 'card'){
        //     if (xCoord > 35){
        //         e.target.after(card);
        //     }else{
        //         e.target.before(card);
        //     }
        // }

    }




    const dragOver = (e:any) => {
        e.preventDefault();
        if(e.target.parentElement.id === "board" && e.target.className === "card" || e.target.parentElement.id === "board" && e.target.className === "card moveElement" || e.target.id === "board"){
            let target = e.target.closest(`.board`);
            let targetCoords = target.getBoundingClientRect();
            let xCoord = e.clientX - targetCoords.left;
            let yCoord = e.clientY - targetCoords.top; 
            isBetween(xCoord , yCoord , myRef)
        }
    }

    const isBetween = (xCoord:number, yCoord:number, myRef:any)=>{
        currentPosition = Object.values(myRef.current.children[0].children).map((item:any)=>{
            return {
                id:item.id,
                positionOX: item.offsetLeft - item.parentElement.offsetLeft - Number(getComputedStyle(item).marginLeft.replace("px", "")),
                positionOY:item.offsetTop - item.parentElement.offsetTop,
                width:item.clientWidth,
                height:item.clientHeight,
            }
        });
        currentPosition.forEach((item:Position, index:number)=>{
            if (xCoord > 400 && yCoord < 45){
                if (item.positionOX == 320){
                    myRef.current.children[0].children[index].classList.remove('moveElement')
                    myRef.current.children[0].children[index].classList.add('newLine')
                    // myRef.current.children[index].classList.remove('newLine')
                }
            }else if (myRef.current.children[0].children[index].classList.contains('newLine')){
                myRef.current.children[0].children[index].classList.remove('newLine')
            }
            else if ( yCoord > item.positionOY && yCoord < item.positionOY + item.height && xCoord < item.positionOX + item.width + 10 && xCoord>item.positionOX){
                myRef.current.children[0].children[index].classList.add('moveElement')
            }else{
                myRef.current.children[0].children[index].classList.remove('moveElement')
            }
        })
    }

    return (
        <div
            id={props.id}
            className = {props.className}
            onDrop = {drop} 
            ref = {myRef}
            onDragOver = {dragOver}
        >
            <Board id = "board" className = "board"/>
            <CheckBoard id = 'chboard' className = "board"/>
            {props.children}
        </div>
    )
}
export default Hollow;
