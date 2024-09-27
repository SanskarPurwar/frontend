import { useState } from "react";
import Display from '../../assets/Display.svg'
import down from '../../assets/down.svg'

function Header({ onGroupingChange, onOrderingChange }) {


    const [openDisplay, setOpenDisplay] = useState(false);
    const [errorFetchingData, setErrorFetchingData] = useState(null);
    const handleGroupingChange = (e) => {
        onGroupingChange(e.target.value);
    };

    const handleOrderingChange = (e) => {
        onOrderingChange(e.target.value);
    };


    const handleDisplayClick = () => {
        setOpenDisplay((openDisplay) => !openDisplay);
    }

    return (
        <header className='header-container'>
            <div className='display' onClick={handleDisplayClick}>
                <img src={Display} alt="" />
                <span>Display</span>
                <img src={down} alt="" />
            </div>

            {openDisplay && (
                <div className="dropdown-content">
                    <div className="dropdown-section">
                        <label>Grouping : </label>
                        <select name="grouping" onChange={handleGroupingChange}>
                            <option value="status">Status</option>
                            <option value="priority">Priority</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <div className="dropdown-section">
                        <label>Ordering</label>
                        <select name="ordering" onChange={handleOrderingChange}>
                            <option value="title">Title</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;