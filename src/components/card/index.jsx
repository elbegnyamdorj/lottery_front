import React from "react";

import './style.css';

export const Card = props =>(
    <div className='card-container'>
        <strong> {props.lottery.lottery_number}</strong>
    </div>
)