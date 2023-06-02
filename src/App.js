import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import SL from './components/SL/SL';
import Qbg from './components/images/signup_bg.png';
import Ansbox from './components/Ansbox/Ansbox';
import Main from './components/Main/Main';
import Quesbox from './components/Quesbox/Quesbox';
import Testing from './components/testing/Testing';
function App() {
//<Ansbox/>
//<Main/>
//<Quesbox/>
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='sl' element={<SL/>}/>
      <Route path='' element={<Main/>}/>
      <Route path='ansbox' element={<Ansbox/>}/>
      <Route path='quebox' element={<Quesbox/>}/>
      <Route path='test' element={<Testing/>}/>
      </Routes>  
      </BrowserRouter>
    </>
    
  );
}

export default App;
