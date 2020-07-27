import ListItemText from '@material-ui/core/ListItemText';
import React from 'react'
import './style.css'

export default function LegendItem (props) {
    //==================================================================================================
    // "props" here are just a 'style' which is used to display text and also determine the color of
    //   the component
    //==================================================================================================
    return (
        <div>
            <div className={props.style.toLowerCase() + " legend-box"}>
            </div>
            <div className="legend-text">
                <ListItemText primary={props.style} />
            </div>
        </div>
    )
}