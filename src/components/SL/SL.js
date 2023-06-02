import './SL.css';
import Qbg from '../images/signup_bg.png';
import Qlogo from '../images/Quora_logo.png';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function SL(){
//---------------------Signup------------------------------//
        const navigate = useNavigate();
        const [input, setInput] = useState({
                username: "",
                email: "",
                password: ""
        });
        const onChangeHandlerSU = (event)=>{
                let name= event.target.name;
                let value= event.target.value;
                setInput({...input, [name]: value})
                
        };
        const checkingEmptyValidation=(value)=>{
                if(value){
                  return true;
                }
                else {
                  return false;
                }
              }
              const minLengthValidation=(value)=>{
                if(value.length>3){
                  return true;
                }
                else {
                  return false;
                }
              }
              const onSubmitHandlerSU = (event)=>{
                event.preventDefault();
                if(!checkingEmptyValidation(input.username) || !minLengthValidation(input.username)){
                        alert("NameSU cannot be empty and minlength is 5");
                        return;
                      }
                if(!checkingEmptyValidation(input.email) || !minLengthValidation(input.email)){
                        alert("Email cannot be empty and minlength is 5");
                        return;
                      }
                if(!checkingEmptyValidation(input.password) || !minLengthValidation(input.password)){
                        alert("Password cannot be empty and minlength is 5");
                        return;
                      }
                axios.post('http://localhost:3000/registration', input).then((value)=>{
                sessionStorage.setItem("email", input.email);
                sessionStorage.setItem("LS", "true");
                console.log(value.data);
                clearingData();
                navigate('/');
        }).catch((error)=>{
                console.log(error);
        });
        };
        const clearingData = ()=>{
                
        };
//---------------------Login------------------------//
        const [inputlg, setInputlg] = useState({
        email: "",
        password: ""
        });
        const onChangeHandlerLG = (event)=>{
                let name= event.target.name;
                let value= event.target.value;
                setInputlg({...inputlg, [name]: value})
                console.log(inputlg);
                
        };
        const onSubmitHandlerLG = (event)=>{
                event.preventDefault();
                if(!checkingEmptyValidation(inputlg.email) || !minLengthValidation(inputlg.email)){
                        alert("Email cannot be empty and minlength is 5");
                        return;
                      }
                      if(!checkingEmptyValidation(inputlg.password) || !minLengthValidation(inputlg.password)){
                        alert("Password cannot be empty and minlength is 5");
                        return;
                      }
                axios.get(`http://localhost:3000/registration?email=${inputlg.email}&password=${inputlg.password}`).then((result)=>{
                if(result.data && result.data.length>0){
                        sessionStorage.setItem("email", inputlg.email);
                        sessionStorage.setItem("LS", "true");
                        navigate("/");
                } 
                else{
                        alert("Email and password not matching");
                }
        }).catch((error)=>{
                console.log(error);
        });
        };


        return(<>
        <div>
                <img className='fullimg' src={Qbg}/>
        </div>
        
        <div className="container" >
        <div><img src={Qlogo} className="blogo"/></div>
        <p className="txtcntr"><b>A place to share knowledge and better understand the world</b></p>
        
                <div className="box vr">
                <form>
                <p><b>Sign Up</b></p><hr/>
                <div className="form-group shrink">
                <label>Name</label>
                <input type="text" name="username" className="form-control" onChange={onChangeHandlerSU}  placeholder="Your name"/>
                </div>
                <div className="form-group shrink">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" name="email" className="form-control" onChange={onChangeHandlerSU} aria-describedby="emailHelp" placeholder="Your email"/>                 
                </div>
                <div className="form-group shrink">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" name="password" className="form-control" onChange={onChangeHandlerSU} placeholder="Your Password"/>
                </div>
                <button type="submit" onClick={onSubmitHandlerSU} className="btn btn-primary">Submit</button>
                </form>
                </div>

                <div className="box">
                <form>
                <p><b>Login</b></p><hr/>
                <div className="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" name="email" className="form-control" onChange={onChangeHandlerLG} aria-describedby="emailHelp" placeholder="Your email"/>                 
                </div>
                <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" name="password" className="form-control" onChange={onChangeHandlerLG} placeholder="Your Password"/>
                </div>
                <button type="submit" onClick={onSubmitHandlerLG} className="btn btn-primary">Submit</button>
                </form>
                </div><hr/>

        <div>
            <hr/>    
        </div>
        <div className="txtcntr txtmargin">
                <div><p>By continuing you indicate that you agree to Quora's Terms of Service and Privacy Policy.</p></div>
        </div>
        </div>       
        </>

        )
}
export default SL;