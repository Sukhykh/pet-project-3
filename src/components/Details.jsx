
import '../assets/scss/_Details.scss';

import React from "react"

const Details = (props) => {

    const backToNormal = () => {
        props.details.setDetails(!props.details.details)
    }


    return (
        <div className="hello">
            <div >{props.details.cityId}</div>
            <button onClick={backToNormal}>helo</button>
        </div>
    )
}

export default Details