import React, { useState } from 'react';
import Axios from 'axios'
import AuthService from "../services/auth.service";
import Unauthorized from './Unauthorized'

const AddOffer = () => {
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [profile, setProfile] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [location, setLocation] = useState('');
  const [wages, setWages] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const currentUser = AuthService.getCurrentUser();

  const [count, setCount] = useState(0);

 
  const SubmitFunction = () => {
    Axios.post('http://localhost:8080/api/insert', {
      companyName: companyName, description: description, profile: profile, companySize: companySize, location: location, wages: wages, workTime: workTime, fullDescription: fullDescription, posterId: currentUser.id
    }).then(() => {
    })
  }

  return (
    <div>
      {currentUser.roles == "ROLE_ADMIN" ? ( // REMPLACER PAR COMPANY
        <div className='addoffer'>
          <h1>Add offers</h1>
          <label>Company Name: </label>
          <input type="text" name="companyName" onChange={(e) => {
            setCompanyName(e.target.value)
          }} />
          <label>description: </label>
          <input type="text" name="description" onChange={(e) => {
            setDescription(e.target.value)
          }} />
          <label>profile: </label>
          <input type="text" name="profile" onChange={(e) => {
            setProfile(e.target.value)
          }} />
          <label>companySize: </label>
          <input type="text" name="companySize" onChange={(e) => {
            setCompanySize(e.target.value)
          }} />
          <label>location: </label>
          <input type="text" name="location" onChange={(e) => {
            setLocation(e.target.value)
          }} />
          <label>wages: </label>
          <input type="text" name="wages" onChange={(e) => {
            setWages(e.target.value)
          }} />
          <label>workTime: </label>
          <input type="text" name="workTime" onChange={(e) => {
            setWorkTime(e.target.value)
          }} />
          <label>fullDescription: </label>
          <textarea rows="5" cols="33" type="text" maxlength="3000" name="fullDescription" onChange={(e) => {
            setFullDescription(e.target.value)
            setCount(e.target.value.length)
          }} />
          <p>{count}/3000</p>
          <a href='/jobs'><button onClick={SubmitFunction}>submit</button></a>
        </div>
      ) : (
        <Unauthorized />
        )}
    </div>
  )
}

export default AddOffer