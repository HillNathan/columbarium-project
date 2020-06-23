import React from 'react'
import { MapInteractionCSS } from 'react-map-interaction';
import PlotBox from '../PlotSquare'
import './style.css'

export default function PlotMap (props) {
    return (
        <MapInteractionCSS>
            <table><tbody>
            {props.plotList.map((thing1, index) => {
                return (
                <tr key={index}>
                {thing1.map(thing2 => {
                    return (
                    <td key={thing2.id}>
                    <PlotBox 
                        handleOpen={props.handleOpen}
                        clickable={thing2.clickable}
                        theClass={thing2.status.toLowerCase()}
                        name={thing2.reserved_by}
                        id={thing2.id}
                        plot={thing2.plot_number}
                        status={thing2.status}
                    /></td>) 
                    } 
                    
                    )}
                </tr>
                )
            })}
            </tbody></table>
        </MapInteractionCSS> 
    )
}