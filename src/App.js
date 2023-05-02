import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import GetStarted from './pages/getstarted/GetStarted';
import { useState } from 'react';
import UserPage from './pages/userpage/UserPage';


function App() {

  const [userProp, setUserProp] = useState(() => {
    const storedUserProp = localStorage.getItem('userProp');
    return storedUserProp ? JSON.parse(storedUserProp) : null;
  });

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/login' element={<GetStarted setUserProp={setUserProp}/>}/>
          <Route path='/userpage' element={<UserPage userProp={userProp} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
