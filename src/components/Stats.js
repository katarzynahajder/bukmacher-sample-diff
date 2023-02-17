import React from 'react'
import data from "./mock-data.json"
import "./Stats.css"

const Stats=()=>{
    let percentage=0
    const circleSize=200
    const radius=85
    const dashArray=radius*Math.PI*2

    let allBets=3
    let wonBets=2
    data.forEach((record)=>{
        if(record.state==="Won"){
            allBets+=1
            wonBets+=1
        }
        else if(record.state==="Lost")allBets+=1
    })
    if(allBets!==0)percentage=Number(Math.round(wonBets/allBets*100))
    const dashOffset=dashArray-(dashArray*percentage)/100

    return(
        <div id="stats">
            <h2>BETS WON</h2>
            <svg 
                width={circleSize} 
                height={circleSize} 
                viewBox={`0 0 ${circleSize} ${circleSize}`}>
                <circle
                    cx={circleSize/2} 
                    cy={circleSize/2} 
                    strokeWidth="15px" 
                    r={radius} 
                    className="circleBackground"/>
                <circle
                    cx={circleSize/2} 
                    cy={circleSize/2} 
                    strokeWidth="15px" 
                    r={radius} 
                    className="circleProgress"
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                    }}
                    transform={`rotate(-90 ${circleSize/2} ${circleSize/2})`}/>
                <text
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle"
                    className="circleText">
                    {percentage}%
                </text>
            </svg>
            <p>{wonBets} out of {allBets}</p>
        </div>
    )
}

export default Stats