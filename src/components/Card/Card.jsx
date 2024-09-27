import { useState } from "react";
import Done from "../../assets/Done.svg"
import Display from "../../assets/Display.svg"
import NoPriority from "../../assets/No-priority.svg"
import Low from "../../assets/Img - Low Priority.svg"
import High from "../../assets/Img - High Priority.svg"
import Medium from "../../assets/Img - Medium Priority.svg"
import Urgent from "../../assets/SVG - Urgent Priority grey.svg";
import cancelled from '../../assets/Cancelled.svg'
import InProgress from '../../assets/in-progress.svg'
import Todo from '../../assets/To-do.svg'
import Backlog from '../../assets/Backlog.svg'

import './card.css'

function Card({ticket}){
    
    const Priorities = {
        0 : NoPriority,
        1: Low,
        2 : Medium,
        3: High,
        4: Urgent
    }

    const status_img = {
        "Todo" : Todo,
        "In progress" : InProgress,
        "Done" : Done,
        "Cancelled" :  cancelled ,
        "Backlog" : Backlog
    }

    return (
        <>
         <div className="ticket_card">
            <p className="dis_inline font_grey">{ticket.id}</p>

            <div className="flex_gap">
               <img src={status_img[ticket.status]} alt="" />
               <p className="dis_inline text_wrap">{ticket.title}</p>
            </div>

            <div className="flex_gap font_grey">
               <img src={Priorities[ticket.priority]} alt="" />
               <p className="dis_inline">{ticket.tag[0]}</p>
            </div>
         </div>
        </>
    ) ;
}

export default Card