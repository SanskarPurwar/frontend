import { useState } from "react";
import Done from "../../assets/Done.svg"
import Display from "../../assets/Display.svg"
import NoPriority from "../../assets/No-priority.svg"
import Low from "../../assets/Img - Low Priority.svg"
import High from "../../assets/Img - High Priority.svg"
import Medium from "../../assets/Img - Medium Priority.svg"
import Urgent from "../../assets/SVG - Urgent Priority grey.svg";

import Backlog from "../../assets/Backlog.svg";

import './card.css'

function Card({ticket}){
    
    const Priorities = {
        0 : NoPriority,
        1: Low,
        2 : Medium,
        3: High,
        4: Urgent
    }


    return (
        <>
         <div className="ticket_card">
            <div className="flex_between">
                <p className="dis_inline">{ticket.id}</p>
                {/* <img src={Display} alt="" /> */}
            </div>

            <div className="flex_gap">
               <img src={Done} alt="" />
               <p className="dis_inline text_wrap">{ticket.title}</p>
            </div>

            <div className="flex_gap">
               <img src={Priorities[ticket.priority]} alt="" />
               <p className="dis_inline">{ticket.tag[0]}</p>
            </div>
         </div>
        </>
    ) ;
}

export default Card