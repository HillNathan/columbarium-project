import ListItemText from '@material-ui/core/ListItemText';
import React from 'react'
import './style.css'

export default function LegendItem (props) {
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