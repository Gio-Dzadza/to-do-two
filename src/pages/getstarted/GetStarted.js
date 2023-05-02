import { useNavigate } from 'react-router-dom'
//style
import './GetStarted.css'
//image
import PhotoCamera from '../../assets/photocamera.svg'
import { useState } from 'react';


export default function GetStarted({ setUserProp }) {
  const [name,setName] = useState('');
  const [image, setImage] = useState(null); 
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();


  const userObj = {
    name: name,
    image: imageUrl
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
    localStorage.setItem('userProp', JSON.stringify(userObj));
    setUserProp(userObj);
    navigate('/userpage');
  }

  const handleImageInput = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage));
  }


  const goBack = ()=>{
    navigate(-1)
  }


  const isFormValid = !!name && !!image && !!userObj;

  return (
    <div className='get-started-wrapper'>
      <div className='get-started-form'>
        <h1 className='get-start-heading'>get started</h1>
        <form className='form' id='form-id' onSubmit={handleSubmit}>
          <label className='photo-upload'>
            <span>add a photo</span>
            <div className='photo-icon'>
              {
                imageUrl ? (<img src={imageUrl} alt="Selected file" style={{ maxWidth: '100%', maxHeight: '120%' }} />) :
                (<img src={PhotoCamera} alt="Upload photo" />)
              }
              <input hidden
                type='file'
                onChange={handleImageInput}
              />
            </div>
          </label>
          <label className='name'>
            <span>fill your name</span>
            <input 
              type='text'
              placeholder='your name'
              className='name-input'
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
          </label>
          {
            isFormValid && (<button
              type='submit'
              form='form-id'
              className='sign-in-btn'
              onClick={handleSubmit}
            >
              sign in
            </button>)
          }
        </form>
        <button className='go-back-btn' onClick={()=>{goBack()}}>go back</button>
      </div>
    </div>
  )
}
