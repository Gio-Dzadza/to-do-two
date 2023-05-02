//react-router-dom hook
import { useNavigate } from 'react-router-dom'

//style
import './UserPage.css'

//react hooks and components
import { useEffect, useState } from 'react';
import EventList from '../../components/EventList';


export default function UserPage({ userProp }) {
    const name = userProp?.name;
    const image = userProp?.image;
    const history = useNavigate();
    const [input, setInput] = useState("");
    const [events, setEvents] = useState(() => {
        const storedEvents = localStorage.getItem('events');
        return storedEvents ? JSON.parse(storedEvents) : [];
    });
    const [showLogout, setShowLogout] = useState(false);

    useEffect(()=>{
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    },[])

    const handleInputChange = (e)=>{
        setInput(e.target.value);
    }

    const handleNewFormSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') {
            return;
        }
        const newEvent = {
            title: input,
            completed: false,
            id: Math.floor(Math.random() * 1000),
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setInput("");
        localStorage.setItem('events', JSON.stringify([...events, newEvent]));
    };
    
    const handleDoneClick = (id) => {
        const updatedEvents = events.map((event) => {
            if (event.id === id) {
            return { ...event, completed: !event.completed };
            }
        return event;
        });
        setEvents(updatedEvents);
    };
    
    const handleDeleteClick = (id) => {
        const updatedEvents = events.filter((event) => event.id !== id);
        setEvents(updatedEvents);
    };

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);


    const handleLogoutClick = () => {
        localStorage.removeItem('userProp');
        localStorage.removeItem('events');
        history('/to-do-two'); 
    };

return (
    <div>
        <nav className='user-nav'>
            <h1 className='logo-heading'>TO DO</h1>
            <p className='your-name'>{name}</p>
            <img src={image} className='image' onClick={() => setShowLogout(!showLogout)} />
        {showLogout && (
            <button className='logout-btn' onClick={handleLogoutClick}>
            Log-Out
            </button>
        )}
        </nav>
        <form className='user-form' onSubmit={handleNewFormSubmit}>
            <label className='task-label'>
                <span className='user-form-heading'>add your daily tasks</span>
                <div className='user-form-input-wrapper'>
                    <input 
                        className='user-form-input' 
                        type="text"  
                        placeholder='my task'
                        value={input}
                        onChange={handleInputChange}
                    />
                    <button type='submit' className='add-btn'>Add</button>
                </div>
            </label>
            <ul className='events-list'>
                {
                <EventList events={events} handleDoneClick={handleDoneClick} handleDeleteClick={handleDeleteClick} />
                }
            </ul>
        </form>

    </div>
)
}