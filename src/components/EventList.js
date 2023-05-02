//styles
import './EventList.css'

//icons
import Done from '../assets/done.svg'
import Delete from '../assets/delete.svg'


export default function EventList({ events, handleDoneClick, handleDeleteClick }) {

  return (
    <div className='events-wrapper'>
        {events.map((event, index)=>(
            <div key={event.id} className={`event ${event.completed ? 'done' : ''}`}>
                <h2 className='event-heading'>{event.title}</h2>
                <button className='done-btn' onClick={() => handleDoneClick(event.id)}>
                <img
                    src={Done}
                    alt='done'
                />
                </button>
                <button  className='delete-btn' onClick={()=>{handleDeleteClick(event.id)}}>
                <img
                    src={Delete}
                    alt='delete'
                />
                </button>
            </div>
        ))}
    </div>
  )
}