import React from 'react';

export default function SearchListItem(props) {
    return(
        <li>{props.person.salutation} {props.person.firstName} {props.person.middleName} {props.person.lastName} {props.person.suffix}</li>
        )
}