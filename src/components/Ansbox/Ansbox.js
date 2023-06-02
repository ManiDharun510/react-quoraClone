import './Ansbox.css';
import Qbg from '../images/signup_bg.png';
import Qlogo from '../images/Quora_logo.png';
import Qicon from '../images/quora_icon.png';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Ansbox(){

  const navigate = useNavigate();

  const [getId, setId] = useState(-1);
  const [getForm, setForm] = useState({
    que:"",
    ans:""
  });
  const [getAns, setAns] = useState({

  })
  const [getList,setList] = useState([]);
  const getListApi = ()=>{
    axios.get('http://localhost:3000/question').then((result)=>{
      console.log(result.data);
      setList(result.data);
    }).catch(()=>{

    })
  }
  useEffect(()=>{
    getListApi()
  },[]);

  const onExistingBinderHandler = (index)=>{
    setId(index);
    setForm({
      que:getList[index].que,
      ans:getList[index].ans,
      Author:getList[index].Author,
    })
  }
  const onChangeHandler = (event)=>{
    setAns({[event.target.name] : event.target.value})
  }

  const onEditSubmitHandler = ()=>{
    axios.put(`http://localhost:3000/question/${getList[getId].id}`, {...getForm, ans:[...getForm.ans, {...getAns, author:sessionStorage.getItem("email").slice(0, -10)}] , email:getList[getId].email}).then(()=>{
        getListApi();
        
    }).catch(()=>{

    })
    
  
  setId(-1);
  navigate("/");
  }
  return(
    <>
    <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light navigbarshrink">
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
                          <Link to="/ansbox"><button className="redbutton">Answer question</button></Link>
                          <button className="redbutton">Logout</button>
                        </div>
                      </ul>
                    </div>
                  </nav>
              </div>

              <div className="contbox">
                <div className="quebox">
                    <h2>Select Question</h2>
                    <div>
                    {getList.map((obj, index)=>{
                    return (<a href="#" onClick={()=>onExistingBinderHandler(index)}><p key={index}>{obj.que}</p></a>)
                  })}
                    </div>
                </div>

                <div className="quebox">
                    <h5>Question: {getForm.que}</h5>
                    <h2>Answer:</h2>
                    <form>
                    <textarea className="ansbox" onChange={onChangeHandler}  type="text" name="answer"></textarea><br/>
                    <button type="submit" onClick={onEditSubmitHandler}>Submit</button>
                    </form>
                </div>
              </div>
        </div>
    </>
  )
}
export default Ansbox;
