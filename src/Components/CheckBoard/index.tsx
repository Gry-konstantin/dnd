import React, {useState, useRef, useEffect, RefObject} from 'react';
import Card from '../Card'
const fillingCard = [
    {id : "card-1", text : "esse"},
    {id : "card-2", text : "esst"},
    {id : "card-3", text : "brot"},
    {id : "card-4", text : "essen"},
    {id : "card-5", text : "apfel"},
    {id : "card-6", text : "sie"},
    {id : "card-7", text : "und"},
    {id : "card-8", text : "hello"},
    {id : "card-9 ", text : "isst"},
    {id : "card-10", text : "einen"},
    {id : "card-11 ", text : "sie"},
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
                    positionOX: item.offsetLeft,
                    positionOY:item.offsetTop,
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
        card.style.display = "block"
        e.target.appendChild(card);
        streamline(card, myRef.current)
    }

    function streamline(chart:any , board:any){
        const quantyPerLine = board.childNodes.length > 6 ? board.childNodes.length-6:board.childNodes.length 

        const movableChart:any =  Array.from(board.children).find((item:any) => Number(item.id.replace("card-","")) >= Number(chart.id.replace("card-","")))

        const ordinalPlace = board.childNodes.length - Array.from(board.children).filter((item:any) => Number(item.id.replace("card-","")) >= Number(chart.id.replace("card-",""))).length

        console.log(soursePosition)
        console.log(soursePosition[board.childNodes.length-1])
        console.log(soursePosition[ordinalPlace])
        // console.log(ordinalPlace)

        setTimeout(()=>{
            movableChart.setAttribute('style','margin-left:90px')
            chart.setAttribute('style',`transition:all 1s;position: absolute;left:${soursePosition[ordinalPlace].positionOX}px`) 
        },0)
        setTimeout(()=>{
            movableChart.removeAttribute('style')
            chart.removeAttribute('style')
            movableChart.before(chart)
        },1000)

        // movableChart.before(chart)
        // board.childNodes.forEach(( item:any, index:number ) => {
        //     const line = soursePosition[Number(chart.id.replace("card-",""))-1].positionOY === 65 && board.childNodes.length > 6 ? 2: 1
        //     // const movingOX = (Number(getComputedStyle(item).marginLeft.replace("px", "")) + Number(getComputedStyle(item).width.replace("px", ""))) * 
        //     // (6*line - Number(chart.id.replace("card-","")))
        //     // console.log(Number(getComputedStyle(board).width.replace("px", "")) - (Number(getComputedStyle(chart).marginLeft.replace("px", ""))
        //     // + Number(getComputedStyle(chart).width.replace("px", ""))))
        //     const movingOY = line === 1 ? 50 : 0 
        //     if(Number(item.id.replace("card-",""))  Number(chart.id.replace("card-",""))) {
        //         // console.log(board.childNodes[index])
        //         // if(Number(item.id.replace("card-","")) < Number(chart.id.replace("card-","")) && board.childNodes[index + 1].replace("card-","") > Number(chart.id.replace("card-",""))) {
        //         const movingOX = - 80 * (quantyPerLine) + Number(item.id.replace("card-","")) * 80


        //         setTimeout(()=>{
        //             chart.setAttribute('style',`transition-duration: 1s;transform: translate(${movingOX}px, -${movingOY}px);`)
        //             item.classList.add('moveElementRight')
        //         },0)
        //         setTimeout(()=>{
        //             item.classList.remove('moveElementRight')
        //             chart.removeAttribute('style')
        //             item.after(chart)
        //         },2000)
        //         return true
        //     }
        //     // else if (Number(chart.id.replace("card-",""))===1){
        //     //     setTimeout(()=>{
        //     //         // console.log(chart)
        //     //         chart.setAttribute('style',`transition-duration: 1s;transform: translate(-${movingOX}px, -${movingOY}px);`)
        //     //         item.classList.add('moveElementRight')
        //     //     },0)
        //     //     setTimeout(()=>{
        //     //         item.classList.remove('moveElementRight')
        //     //         chart.removeAttribute('style')
        //     //         board.prepend(chart) 
        //     //     },1000)
        //     // }
        // })
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
function add (){return function(){}}