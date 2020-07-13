import React from 'react';

const trimDate = dateString => {
    if (dateString.slice(4) === "-01-01") return dateString.slice(0,4)
    else return dateString
}

export default function SearchListItem(props) {
    return(
        <li>{props.person.salutation} {props.person.firstName}  {props.person.middleName} {props.person.lastName} {props.person.suffix} <br></br>
        {trimDate(props.person.dateOfBirth)} - {trimDate(props.person.dateOfDeath)}</li>
        )
}