//react-router-dom komponents
// import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

//styles
import './Home.css';

//icon
import MainIcon from '../../assets/mainIcon.svg'



export default function Home() {


  return (
    <div className='home'>
        <img 
            className='main-icon'
            src={MainIcon}
        />
        <h1 className='heading'>Keep Track Of Daily Tasks In Life</h1>
        <Link to="/login" className='btn'>get started</Link>
    </div>
  )
}
