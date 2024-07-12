import React, { useState, useEffect } from "react";
import Axios from 'axios';
import AuthService from "../services/auth.service";

const Company = () => {

  const currentUser = AuthService.getCurrentUser();


  const [jobs, setJobs] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [showApply, setShowApply] = useState(null);

  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [profile, setProfile] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [location, setLocation] = useState('');
//   const [wages, setWages] = useState('');
//   const [workTime, setWorkTime] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [id,setId] = useState('')

  const [postId, setPostId] = useState('')
  const [applyerId, setApplyerId] = useState('')
  const [message, setMessage] = useState('')

  const getData = () => {
    Axios.get('http://localhost:8080/api/getCompany').then((response) => {
      setJobs(response.data);
      console.log("aa", response.data)
      console.log("response",response)
    })
  }
  useEffect(() => {
    getData()
  }, [])

    // const updateFunction = (toto) => {
    //   Axios.put(`http://localhost:8080/api/update/${toto.id}`, {
        // // companyName: companyName, description: description, profile: profile, companySize: companySize, location: location, wages: wages, workTime: workTime, fullDescription: fullDescription, id:id
    //   }).then((res)=>{
    //     console.log(res,"uuu")
    //     getData()
    //     setUpdateData(null)
    //   })
    //   console.log(profile,"ici profile")
    // }
    const sendApply = (data) => {
      Axios.post('http://localhost:8080/api/insertCompany', {
        postId: postId, applyerId: applyerId, message: message
      }).then(() => {
        console.log(data,"TEST DDATA  ////")
        console.log(applyerId,"test")
        getData()
        setUpdateData(null)
        setShowApply(null)
      })
    }

  const showBtn = (data) =>{
    setCurrentData(currentData === data ? null : data)
    setUpdateData(null)
    setApplyerId(currentUser.id)
    setPostId(data.id)
    setShowApply(null)
  }

  const applyBtn = (data) =>{
    setUpdateData(null)
    setShowApply(data)
    setCurrentData(null)

  }

  const updateBtn = (currentData) => {
    setCompanyName(currentData.companyName)
    setDescription(currentData.description)
    setProfile(currentData.profile)
    setCompanySize(currentData.companySize)
    setLocation(currentData.location)
    // // setWages(currentData.wages)
    // // setWorkTime(currentData.workTime)
    setFullDescription(currentData.fullDescription)
    setId(currentData.id)
    setUpdateData(currentData)
    setCurrentData(currentData ? null : updateData)
    console.log(updateData, "edzae")
  }
  return (
    <div className="jobBox-company">
      <div className='leftSide'>
        {jobs.map((data) => ( 
          <div className="advertismentBlock">
            <div className="j">
              <div className="firstBlock">
                <img className="image" src={data.image} alt="Logo" ></img>
              </div>
              <div className="secondBlock">
                <div className="title"><h1>{data.companyName}</h1></div>
                <div className="shortDescription"><p>{data.description}</p></div>                
                <button onClick={()=>{showBtn(data)}}>Learn more..</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentData && (
        <div id='rightSide-company'>
          <p>{currentData.profile}</p>
          <p>{currentData.companySize}</p>
          <p>{currentData.companyName}</p>
          <img src={currentData.image} alt="Logo" />
          <p>{currentData.fullDescription}</p>

            <div>
          <button onClick={()=>{updateBtn(currentData)}}>Go to profile</button>
          <button onClick={()=>{applyBtn(currentData)}}>Send Message</button>
          </div>
        </div>
      )}
      {updateData && (
        <div id='rightSide-company'>
          {/* createForm */}
          <div>
            <label>Company Name: </label>
            <input type="text" name="companyName" value={companyName} onChange={(e) => {
              setCompanyName(e.target.value)
            }} />
            <label>description: </label>
            <input type="text" name="description" value={description} onChange={(e) => {
              setDescription(e.target.value)
            }} />
            <label>profile: </label>
            <input type="text" name="profile" value={profile} onChange={(e) => {
              setProfile(e.target.value)
            }} />
            <label>companySize: </label>
            <input type="text" name="companySize" value={companySize} onChange={(e) => {
              setCompanySize(e.target.value)
            }} />
            <label>location: </label>
            <input type="text" name="location" value={location} onChange={(e) => {
              setLocation(e.target.value)
            }} />
            <label>fullDescription: </label>
            <textarea rows="5" cols="33" type="text" name="fullDescription" value={fullDescription} onChange={(e) => {
              setFullDescription(e.target.value)
            }} />
            {/* <button onClick={()=>{updateFunction(updateData)}} >submit</button> */}
          </div>
        </div>
      )}
      {showApply && (
        <div id='rightSide-company'>
          <label>Message: </label>
          <textarea rows="15" cols="50" type="text"  onChange={(e) => {
              setMessage(e.target.value)
            }}></textarea>
          <button onClick={()=>{sendApply(showApply)}}>Send</button>
        </div>
      )}
    </div>
  );
}; 
export default Company