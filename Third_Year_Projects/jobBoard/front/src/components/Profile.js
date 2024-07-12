import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import Axios from "axios";
const Profile = () => {

  const [form, setForm] = useState(null);
  const [fullName,setFullName] = useState('')
  const [email,setEmail] = useState('')
  const [adress,setAdress] = useState('')
  const [number,setNumber] = useState('')
  const [currentData,setCurrentData] = useState([])
  const [role, setRole] = useState(1)

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    Axios.get(`http://localhost:8080/api/get/${currentUser.id}`).then((response) => {
      setCurrentData(response.data); 
      console.log("aa", response.data[0])
      console.log("response",response.data)
    })

  }
  const updateProfile = () => {
    updateRole()
      Axios.put(`http://localhost:8080/api/update/profile/${currentUser.id}`, {
        fullName:fullName,email:email,adress:adress,number:number
      }).then(() => {
        setForm(null)
        getData()
      })
    }

    const updateRole= () => {
      Axios.put(`http://localhost:8080/api/update/profile/role/${currentUser.id}`, {
      role:role
    }).then(() => {
      })
    }
    const showform = (info) => {
      setForm(form === null ? currentUser: null)
      setEmail(info.email)
      setAdress(info.adress)
      setNumber(info.number)
      setFullName(info.fullName)
    }
    const hideform = () => {
      setForm(null)
  }
  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
    console.log(role)
  };
  return (
    <>
    {!form &&
    // <div className="container">
    //   <header className="jumbotron">
    //     <h1>Welcome</h1>
    //     <h3>
    //       <strong>{currentUser.username}</strong>
    //     </h3>
    //   </header>
    //   <p>
    //     <strong>Id:</strong> {currentUser.id}
    //   </p>
    //   <p><strong>FullName:</strong>{crrentUser.fullName}</p>
    //   <p>
    //     <strong>Email:</strong> {currentUser.email}
    //   </p>
    //   <p><strong>Adress:</strong>{currentUser.adress}</p>
    //   <p><strong>Number:</strong>{currentUser.number}</p>
    //   <strong>Authorities:</strong>
    //   <ul>
    //     {currentUser.roles &&
    //       currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
    //   </ul>
    //   <button onClick={()=>{showform()}}>uptdate Info</button>
    //   </div>
    <div>
      {currentData.map((info)=>(
   <div className="container">
      <header className="jumbotron">
        <h1>Welcome</h1>
        <h3>
          <strong>{info.username}</strong>
        </h3>
      </header>
          <img src="/images/defaultImg.png" alt="defaultImg"></img>
      <p>
        <strong>Id:</strong> {info.id}
      </p>
      <p><strong>FullName:</strong>{info.fullName}</p>
      <p>
        <strong>Email:</strong> {info.email}
      </p>
      <p><strong>Adress:</strong>{info.adress}</p>
      <p><strong>Number:</strong>{info.number}</p>
      <strong>Authorities:</strong>
      <ul>
        {info.roles &&
          info.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <button onClick={()=>{showform(info)}}>uptdate Info</button>
      </div>
      ))}
    </div>
      }
      {form && (
        <div className="container">
        <header className="jumbotron">
        <h1>Welcome</h1>
          <h3><strong>{currentUser.username}</strong></h3>
        </header>
         <p>
         <strong>Id:</strong> {currentUser.id}
       </p>
       <label><strong>FullName:</strong></label>
       <input type="text" value={fullName} onChange={(e) => {
              setFullName(e.target.value)}}></input>

       <label><strong>Email:</strong></label>
       <input  type="email" id="email"
       pattern=".+@globex\.com" size="2 0" required value={email} onChange={(e) => {
              setEmail(e.target.value)}}></input>

       <label><strong>Adress:</strong></label>
       <input type="text" value={adress} onChange={(e) => {
              setAdress(e.target.value)}}></input>

       <label><strong>Number:</strong></label>
       <input type="tel" pattern="[0-10]" value={number} onChange={(e) => {
              setNumber(e.target.value)}}></input>

       <strong>Authorities:</strong>
       <select onChange={onChangeRole}>
        <option value="1">User</option>
        <option value="2">Admin</option>
        <option value="3">Company</option>
       </select>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <button onClick={()=>{hideform()}}>Cancel :P</button>
      <button onClick={()=>{updateProfile()}}>update</button>
       </div>
      )}
    </>
  );
};

export default Profile;