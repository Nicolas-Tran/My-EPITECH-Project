import React, { useState, useEffect } from "react";
import Axios from 'axios';
import AuthService from "../services/auth.service";
import DefaultHome from "./DefaultHome";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEnvelope, faPen, faPaperPlane } from '@fortawesome/free-solid-svg-icons';



import { Link } from "react-router-dom";


const Jobs = () => {

  const currentUser = AuthService.getCurrentUser();


  const [jobs, setJobs] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [showApply, setShowApply] = useState(null);
  const [success, setSuccess] = useState(null);


  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [profile, setProfile] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [location, setLocation] = useState('');
  const [wages, setWages] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [id, setId] = useState('')

  const [postId, setPostId] = useState('')
  const [applyerId, setApplyerId] = useState('')
  const [message, setMessage] = useState('')

  const [count, setCount] = useState(0);

  const getData = () => {
    Axios.get('http://localhost:8080/api/get').then((response) => {
      setJobs(response.data);
      console.log("aa", response.data)
      console.log("response", response)
    })
  }
  useEffect(() => {
    getData()
  }, [])

  const deleteFunction = (data) => {
    console.log("test")
    Axios.delete(`http://localhost:8080/api/delete/${data}`)
      .then((res) => {
        console.log("aaaaaa")
        getData()

      })
    setShowApply(null)
    setUpdateData(null)
    setCurrentData(null)
  }

  const updateFunction = (toto) => {
    Axios.put(`http://localhost:8080/api/update/${toto.id}`, {
      companyName: companyName, description: description, profile: profile, companySize: companySize, location: location, wages: wages, workTime: workTime, fullDescription: fullDescription, id: id
    }).then((res) => {
      console.log(res, "uuu")
      getData()
      setUpdateData(null)
    })
    console.log(profile, "ici profile")
  }
  const sendApply = (data) => {
    Axios.post('http://localhost:8080/api/apply', {
      postId: postId, applyerId: applyerId, message: message
    }).then(() => {
      console.log(data, "TEST DDATA  ////")
      console.log(applyerId, "test")
      getData()
      setUpdateData(null)
      setShowApply(null)
      handleSend()
      setSuccess(!null)
      setTimeout(() => {
        setSuccess(null);
      }, 2000)
    })
  }

  const showBtn = (data) => {
    setCurrentData(currentData === data ? null : data)
    setUpdateData(null)
    setApplyerId(currentUser.id)
    setPostId(data.id)
    setShowApply(null)
  }

  const applyBtn = (data) => {
    setUpdateData(null)
    setShowApply(data)
    setCurrentData(null)

    setName(currentUser.fullName);
    setEmail(currentUser.email);
    setCompany(currentData.companyName);
    setNumber(currentUser.number);
    setLieu(currentUser.adress)
  }

  const updateBtn = (currentData) => {
    setCompanyName(currentData.companyName)
    setDescription(currentData.description)
    setProfile(currentData.profile)
    setCompanySize(currentData.companySize)
    setLocation(currentData.location)
    setWages(currentData.wages)
    setWorkTime(currentData.workTime)
    setFullDescription(currentData.fullDescription)
    setId(currentData.id)
    setUpdateData(currentData)
    setCurrentData(currentData ? null : updateData)
    console.log(updateData, "edzae")
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [number, setNumber] = useState("");
  const [lieu, setLieu] = useState("")

  const handleSend = async (e) => {
    console.log("ICITESTTTTTT", currentUser)
    try {
      await Axios.post("http://localhost:8080/send_mail", {
        message, name, email, company, number, lieu
      })
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>

      {currentUser ? (
        <div className="jobBox">
          <div className='leftSide'>
            {jobs.map((data) => (
              <div className="advertismentBlock">
                <div className="littleBlock">
                  <div className="firstBlock">
                    {currentUser.id == data.posterId || currentUser.roles == "ROLE_ADMIN" ? (
                      <div className="deleteBtn"><FontAwesomeIcon icon={faTrash} onClick={() => { deleteFunction(data.id) }} style={{ cursor: "pointer", float: "right" }} /></div>
                    ):(
                      <></>
                    )}
                    <img className="image" src="/images/companylogo.png" alt="Logo" ></img>
                    <div className="title"><h1>{data.companyName}</h1></div>
                  </div>
                  <div className="secondBlock">
                    <div className="shortDescription">
                      <p>{data.description}</p>
                    </div>
                    {currentUser.id == data.posterId ? ( 
                      <>
                      <div className="lesBtn">
                        <Link onClick={() => { showBtn(data) }}>Learn more..</Link>
                      </div>
                      </>
                    ) : (
                      <Link onClick={() => { showBtn(data) }}>Learn more..</Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {currentData && (
            <div id='rightSide'>
              {currentUser.roles == "ROLE_ADMIN" || currentUser.id == currentData.postId ? ( // REMPLACER PAR COMPANY
                <div className="jobBtn">
                  <span style={{ cursor: "pointer" }} onClick={() => { updateBtn(currentData) }}>Update<FontAwesomeIcon icon={faPen} /></span>
                  <br /><hr></hr>
                  <span style={{ cursor: "pointer" }} onClick={() => { applyBtn(currentData) }}>Apply <FontAwesomeIcon icon={faEnvelope} /></span>
                </div>
              ) : (
                <div className="jobBtn">
                  <span style={{ cursor: "pointer" }} onClick={() => { applyBtn(currentData) }}>Apply <FontAwesomeIcon icon={faEnvelope} /></span>
                </div>
              )}
              <img className="image" src="/images/companylogo.png" alt="Logo" ></img>
              <p style={{ color: "darkblue", }}>
                #{currentData.profile}&nbsp;
                #{currentData.companySize}&nbsp;
                #{currentData.companyName}&nbsp;
                #{currentData.location}&nbsp;
                #{currentData.wages}&nbsp;
                #{currentData.workTime}
              </p>
              <p>{currentData.fullDescription}</p>
            </div>
          )}
          {updateData && (
            <div id='rightSide'>
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
                <label>wages: </label>
                <input type="text" name="wages" value={wages} onChange={(e) => {
                  setWages(e.target.value)
                }} />
                <label>workTime: </label>
                <input type="text" name="workTime" value={workTime} onChange={(e) => {
                  setWorkTime(e.target.value)
                }} />
                <label>fullDescription: </label>
                <textarea maxlength="3000" rows="5" cols="33" type="text" name="fullDescription" value={fullDescription} onChange={(e) => {
                  setFullDescription(e.target.value)
                  setCount(e.target.value.length)
                }} /><p>{count}/1300</p>
                <button onClick={() => { updateFunction(updateData) }} >submit</button>
              </div>
            </div>
          )}
          {showApply && (
            <div id='rightSide'>
              <label>Message: </label>
              <textarea rows="15" cols="50" type="text" maxlength="1300" onChange={(e) => {
                setCount(e.target.value.length)
                setMessage(e.target.value)
              }}></textarea>
              <p>{count}/1300</p>
              <span style={{ cursor: "pointer", border: "1px solid black", padding: "5px" }} onClick={() => { sendApply(showApply) }}> Send<FontAwesomeIcon style={{ fontSize: "20px" }} icon={faPaperPlane} /></span>
            </div>
          )}
          {success && (
            <div id='rightSide' >
              <div class="alert alert-success"><strong>Message sent ! :) </strong></div>
            </div>
          )}
        </div>
      ) : (
        <DefaultHome />
      )}
    </>
  );
};
export default Jobs