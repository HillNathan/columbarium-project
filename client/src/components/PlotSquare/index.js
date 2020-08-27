import Paper from '@material-ui/core/Paper';
import React from 'react'
import './style.css'

const makeClass = (theClass) => {
    if(theClass === "on hold") return "on-hold"
    else return theClass
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
                            {props.plot}
                        </div>
                    </div>
                </div>
                : 
                <div className={props.theClass + " text-box"}>
                    <span className="plot-text">
                        {props.status}
                    </span>

                </div> }
        </Paper>
        </div>
    )
}