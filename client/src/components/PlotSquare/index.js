import Paper from '@material-ui/core/Paper';
import React from 'react'
import './style.css'

function testClickable() {
    alert("ive been clicked!")
}

export default function PlotSquare (props) {
    return (
        <div key={props.ID} >
        <Paper 
            elevation={3} 
            className="plot"
            id={props.ID}
        >
            {(props.status === "TREE") ? 
                <div className={props.theClass + " text-box"}
                     onClick={() => props.handleOpen({
                         ID: props.ID,
                         status: props.status })
                     }>
                    {props.status}
                </div>
                : 
                <div className={props.theClass + " text-box"}>
                    {props.status}

                </div> }
        </Paper>
        </div>
    )
}