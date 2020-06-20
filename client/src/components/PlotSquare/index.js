import Paper from '@material-ui/core/Paper';
import React from 'react'
import './style.css'

export default function PlotSquare (props) {
    return (
        <div key={props.ID} >
        <Paper 
            elevation={3} 
            className="plot"
            id={props.ID}

        >
            {props.status}
        </Paper>
        </div>
    )
}