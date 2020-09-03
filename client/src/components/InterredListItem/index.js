import React from 'react';

// This function is to trim the beginning of dates off of some of the records. Some people were 
//   recorded in the paper records with just a year of death, and not the exact date. These 
//   records have the full date recorded as YYYY-01-01 so for ease of reading I am trimmimg 
//   those records back down to just the year showing with this function. 
const trimDate = dateString => {
    if (dateString.slice(4) === "-01-01") return dateString.slice(0,4)
    else return dateString
}

const dateFunctions = require('../../datefunctions')


export default function SearchListItem(props) {
    //==================================================================================================
    //  Returns a block of text showing the information passed down through props in a 'person' object
    //==================================================================================================
    return(
        <li>{props.person.salutation} {props.person.firstName}  {props.person.middleName} {props.person.lastName} {props.person.suffix} <br></br>
        {(props.person.dateOfBirth === "") ? 
            <div></div>
          :
            <span>{dateFunctions.displayDate(props.person.dateOfBirth)} - {dateFunctions.displayDate(props.person.dateOfDeath)}</span>
        }
        </li>
        )
}