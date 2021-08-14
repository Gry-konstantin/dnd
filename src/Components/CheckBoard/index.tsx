import React, {useState, useRef, useEffect, RefObject} from 'react';
import Card from '../Card'
const fillingCard = [
    {id : "card-1", text : "esse"},
    {id : "card-2", text : "esst",},
    {id : "card-3", text : "brot",},
    {id : "card-4", text : "essen"},
    {id : "card-5", text : "apfel",},
    {id : "card-6", text : "sie",},
    {id : "card-7", text : "und"},
    {id : "card-8", text : "hello",},
    {id : "card-9 ", text : "isst",},
    {id : "card-10", text : "einen",},
    {id : "card-11 ", text : "sie",}
]
interface Position{
    id:string;
    positionOX:number;
    positionOY:number;
    width:number;
    height:number;
}
function CheckBoard(props:any){
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
        if (e.target.id === "chboard"){
            card.style.display = "block"
            e.target.appendChild(card);
            streamline(card, e.target)
        }
    }

    function streamline(chart:any , board:any){
        board.childNodes.forEach(( item:any ) => {
            if(Number(item.id.replace("card-",""))+1 === Number(chart.id.replace("card-",""))) {
                // console.log(item.id.replace("card-","") + 1, chart.id.replace("card-",""))
                // console.log(item,chart.offsetLeft,chart.parentElement.offsetLeft)
                setTimeout(()=>{
                    chart.setAttribute('style','transition-duration: 1s;transform: translate(-320px, -50px);')
                    item.setAttribute('style','margin-right:80px;')
                },0)
                setTimeout(()=>{
                    item.removeAttribute('style')
                    chart.removeAttribute('style')
                    item.after(chart)
                },1000)
                return true
            }else if (Number(chart.id.replace("card-",""))===1){
                board.prepend(chart) 
            }
        })
    }

    return (
        <div
            id={props.id}
            className = {props.className}
            onDrop = {drop} 
            ref = {myRef}
        >
            {fillingCard.map((inside, index) => {
                if (props.id === "chboard"){
                    return(
                    <Card key = {index} id = {inside.id} className = "card" draggable = "true" >{inside.text}</Card>
                    )
                }else{
                    return;
                }
            }
            )} 
            {props.children}
        </div>
    )
}
export default CheckBoard;