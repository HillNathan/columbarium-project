import Paper from '@material-ui/core/Paper';
import React from 'react'
import './style.css'

export default function PlotSquare (props) {
    return (
        <div key={props.ID} >
        <Paper 
            elevation={3} 
            className="plot"
            id={props.id}
        >
            {(props.clickable === "TRUE") ? 
                <div className={props.theClass + " text-box"}
                     onClick={() => props.handleOpen({
                         plot: props.plot,
                         status: props.status,
                         name: props.name })
                     }>
                    {props.plot}
                </div>
                : 
                <div className={props.theClass + " text-box"}>
                    {props.status}

                </div> }
        </Paper>
        </div>
    )
}