import './Quesbox.css';
import Qbg from '../images/signup_bg.png';
import Qlogo from '../images/Quora_logo.png';
import Qicon from '../images/quora_icon.png'
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function Quesbox(){
  const navigate = useNavigate();

  const [input, setInput] = useState({});
  
  const onChangeHandler = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    setInput({...input, [name]:value, ans:[]})
  }
  const onSubmitHandler = (event)=>{
    event.preventDefault();
    axios.post('http://localhost:3000/question', {...input, email: sessionStorage.getItem('email'), Author: sessionStorage.getItem('email').slice(0,-10)} ).then((value)=>{
    console.log(value.data);
    navigate('/');
    }).catch(()=>{

    });

  }

  return(
    <>
    <div>
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light navigbarshrinkq">
                  <Link to="/"><a className="navbar-brand logoshrink" href=""><img className="imageshrink" src={Qlogo}/></a></Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li>
                      <form>
                        <div >
                          <div className="searchbox">
                            <input type="text" className="form-control" placeholder="Search Quora"/>
                          </div>
                        </div>
                        
                      </form>
                    </li>
                    <div>
                        <Link to="/quebox"><button className="redbutton">Add question</button></Link>
                        <button className="redbutton">Logout</button>
                      </div>
                    </ul>
                  </div>
                </nav>
            </div>
        </div>
        <div>            
            <div className="quenbox">
                <form className="form-inline">
                    <label className="sr-only" for="inlineFormInputGroupUsername2">Your Question</label>
                    <div className="input-group mb-2 mr-sm-2 fmctrl">
                      <div className="input-group-prepend">
                        <div className="input-group-text">Ask Quora?</div>
                      </div>
                      <input type="text" name="que" onChange={onChangeHandler} className="form-control" id="inlineFormInputGroupUsername2" placeholder="Your Question..."/>
                    </div>
                    <button type="submit" onClick={onSubmitHandler} className="btn btn-danger mb-2">Submit</button>
                  </form>
            </div>
        </div>
    </>
  )
}
export default Quesbox;