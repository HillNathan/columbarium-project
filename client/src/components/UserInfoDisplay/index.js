import React from 'react'

export default function UserInfo (props) {
    //==================================================================================================
    // props for this component will be an object that contains the information for a specific user, 
    //   as well as a click function for a button so that we can click to edit this specific user
    //   and a click function to reset their password
    //==================================================================================================
    
    return (
        <div>
            {props.user.username} | {props.user.firstName} | {props.user.lastName}
        </div>
    )
}