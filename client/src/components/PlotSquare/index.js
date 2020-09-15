import Paper from '@material-ui/core/Paper';
import React from 'react'
import './style.css'

const makeClass = (theClass) => {
    if(theClass === "on hold") return "on-hold"
    else return theClass
}

const makeCross = (plotID) => {
    switch (plotID) {
        case 278 : return " cross-br text-box"
                    
        case 279 : return " cross-bl text-box"

        case 300 : return " cross-tr text-box"

        case 301 : return " cross-tl text-box"

        default : return " text-box"
    }
}

const displayText = (myText) => {
    var textArray = []
    if (myText.includes("/")) textArray = myText.split("/") 
    else textArray.push(myText)

    return textArray.map((item,index) => {
        return ( <div key={index}>{item.trim()}</div> )
    })
}

export default function PlotSquare (props) {
    return (
        <div key={props.ID} >
        <Paper 
            elevation={3} 
            className="plot"
            id={props.id}
        >
            { // checking whether the plot is labeled as "clickable" or not here tells us which ones are 
              //   able to be interacted with. certain plots have immovable items in them, and will not 
              //   end up being usable as interrment locations, so those locations are not clickable. 
              //   any location that is viable as an interrment location or that has already been used 
              //   to interr one or more people, is clickable. 
            (props.clickable) ? 
                <div className={makeClass(props.theClass) + " text-box"}>
                    <div className="plot-text">
                        <div className="plot-link"
                            onClick={() => props.handleOpen(props.plot)}>
                                {(props.display === null) ? 
                                    (props.status.slice(0,5) === "SLATE") ?
                                        (props.status.slice(6) === "RESERVED") ? 
                                            "RESERVED"
                                        :
                                            ""
                                    :
                                    props.status
                                :
                                    displayText(props.display)
                                }
                        </div>
                    </div>
                </div>
                : 
                <div className={props.theClass + makeCross(props.id)}></div>
                }
        </Paper>
        </div>
    )
}