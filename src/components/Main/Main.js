import './Main.css'
import Qbg from '../images/signup_bg.png';
import Qlogo from '../images/Quora_logo.png';
import Qicon from '../images/quora_icon.png'
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
function Main(){
  const [getval, setval] = useState("");
  const [getser, setser] = useState(false);
  const [getserlist, setserlist] = useState([]);
  const [loginState, setloginState]=useState(false)
  const navigate = useNavigate();
  const [getList,setList] = useState([]);
  const [search, getSearch] = useState("");
  const getListApi = ()=>{
    axios.get('http://localhost:3000/question').then((result)=>{
      console.log(result.data);
      setList(result.data);
    }).catch((error)=>{
      console.log(error);
    })
  }
  const lon = ()=>{
    {  
      if(sessionStorage.getItem("LS")=="true"){
      setloginState(true)
    }
    else{
      setloginState(false)
    }
  }
  }
  
  useEffect(()=>{
    getListApi();
    lon();
  },[]);

  const onLogouthandler = ()=>{
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('LS');
    navigate("/sl");
  }

  const onLoginhandler = ()=>{
   setloginState(false);
    navigate('/sl');
  }
  
  const onLogoutbuttons =()=>{
    alert("Please Login or Signup to continue...");
    navigate('/sl');
  }

  let fulArr, lgt;
  let serArr = [];


  const onSearchhandler = ()=>{
    let kk = getval;
    axios.get('http://localhost:3000/question').then((result)=>{
      fulArr = result.data;
      lgt = fulArr.length;
      for(let i=0;i<lgt;i++){
        let searh = fulArr[i].que.toLowerCase().search(kk);
        if(searh >= 0){
          serArr.push(fulArr[i]);
        }
      }
      if(serArr.length!=0){
        setser(true);
        setserlist(serArr);
      }
      console.log(getserlist);
      console.log(serArr);
    })
  }

  const onchangeSearchhandler1 = (event)=>{
    setval(event.target.value);
    console.log(getval);
  }

  return(<>
  <div>
              <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light navigbarshrink">
                    <a className="navbar-brand logoshrink" href=""><img className="imageshrink" src={Qlogo}/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                  
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav mr-auto">
                      <li>
                        <form>
                          <div >
                            <div className="searchbox">
                              <input type="text" onChange={onchangeSearchhandler1} className="form-control" name="searchbar" placeholder="Search Quora"/>
                            </div>
                          </div>
                          
                        </form>
                      </li>
                      <div>
                          <button className="redbutton" onClick={onSearchhandler}>Search</button>

                          {!loginState ? <button onClick={onLogoutbuttons} className="redbutton">Add question</button> : 
                          <Link to="/quebox"><button className="redbutton">Add question</button></Link>}

                          {!loginState ? <button onClick={onLogoutbuttons} className="redbutton">Answer question</button> : 
                          <Link to="/ansbox"><button className="redbutton">Answer question</button></Link>}
                          
                          {!loginState ? <button onClick={onLoginhandler} className="redbutton">login</button> : 
                          <button onClick={onLogouthandler} className="redbutton">logout</button>}
                          
                        </div>
                      </ul>
                    </div>
                  </nav>
              </div>
          <div>
            <div className="containerbox">
              <div>                
                
              { getser ? getserlist.map((obj, index)=>{
                  
                  return(<>
                    <div className="ansfeed">                  
                  <p><img className="iconlogo" src={Qicon}/><b>{obj.Author}</b></p>
                    <div className="ansfeedfont">
                      <p key={index}><b>{obj.que}</b></p>
                    </div></div>

                    {obj.ans.map((value, index)=>{
                    return (<div className="onlyans">
                    <div>
                      <p><img img className="iconlogo" src={Qicon}/><b>{value.author}</b></p>
                      <p key={index}>{value.answer}</p>
                    </div>
                    
                  </div>
                  )
                  })}
                
                </>
                  )
                })

                : 
                
                getList.map((obj, index)=>{
                  
                  return(<>
                    <div className="ansfeed">                  
                  <p><img className="iconlogo" src={Qicon}/><b>{obj.Author}</b></p>
                    <div className="ansfeedfont">
                      <p key={index}><b>{obj.que}</b></p>
                    </div></div>

                    {obj.ans.map((value, index)=>{
                    return (<div className="onlyans">
                    <div>
                      <p><img img className="iconlogo" src={Qicon}/><b>{value.author}</b></p>
                      <p key={index}>{value.answer}</p>
                    </div>
                    
                  </div>
                  )
                  })}
                
                </>
                  )
                })}
              
{/* -------------------------------side question--------------------------------------------------- */}
              </div>

                <div className="qfeed">
                <p className="btmborder">Questions</p>
                  <div>{getList.map((obj, index)=>{
                    return (<a href="#"><p key={index}>{obj.que}</p></a>)
                  })}
                  </div>
              </div> 
          </div>
        </div>
      </div>
  </>)
}
export default Main;

