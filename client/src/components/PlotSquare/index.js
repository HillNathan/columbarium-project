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
                <div className={props.theClass + " text-box"}>
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