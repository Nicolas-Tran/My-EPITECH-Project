import React, { useState, useEffect } from "react";
import Axios from 'axios';
import AuthService from "../services/auth.service";
import Unauthorized from "./Unauthorized";

const Database = () => {

  const currentUser = AuthService.getCurrentUser();

  const [jobs, setJobs] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [insertData, setInsertData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [updateDataUserRole, setUpdateDataUserRole] = useState(null);
  const [tables, setTables] = useState([]);
  const [info, setInfo] = useState([]);
  const [status, setStatus] = useState("")

  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [profile, setProfile] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [location, setLocation] = useState('');
  const [wages, setWages] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [id, setId] = useState('')

  const [userId, setUserId] = useState('')
  const [roleId, setRoleId] = useState('')

  const getTable = (table_name) => {
    return new Promise((resolve, reject) => Axios.get(`http://localhost:8080/api/tables/${table_name}`).then((response) => {
      // console.log("TATAT", `http://localhost:8080/api/get-tables/${table_name}`)
      console.log("azza", response.data, "azeaze")
      setInfo(response.data)
      // console.log("response22", response)
      // console.log("datdaa", jobs, "azeazea")
      resolve(response.data)
    }).catch(reject))
  }


  const getData = () => {
    Axios.get('http://localhost:8080/api/database').then((response) => {
      setJobs(response.data);
      console.log("aa", response.data)
      console.log("response", response)
      console.log("data", jobs)
    })
  }
  useEffect(() => {
    getData()
  }, [])



  const showBtn = (data) => {
    setCurrentData(currentData === data ? null : data)
    setUpdateData(null)
    setInsertData(null)
    setCompanyData(null)
    setTables(async (_) => {
      let res = await getTable(data.Tables_in_projectData)
      console.log(data.Tables_in_projectData)
      setStatus(data.Tables_in_projectData)
      return res
    })
    console.log(status)
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

  const insertNewBtn = (currentData) => {
    setCurrentData(currentData)
    setUpdateData(null)
    setInsertData(null)
    setCompanyData(null)
    setStatus(currentData.Tables_in_projectData)

    if (status == "offers") {
      setCompanyName(currentData.companyName)
      setDescription(currentData.description)
      setProfile(currentData.profile)
      setCompanySize(currentData.companySize)
      setLocation(currentData.location)
      setWages(currentData.wages)
      setWorkTime(currentData.workTime)
      setFullDescription(currentData.fullDescription)
      setId(currentData.id)
      setInsertData(currentData)
      setCurrentData(currentData ? null : insertData)
      console.log(insertData, "edzae")
    } else {
      setCompanyName(currentData.companyName)
      setDescription(currentData.description)
      setProfile(currentData.profile)
      setCompanySize(currentData.companySize)
      setLocation(currentData.location)
      setFullDescription(currentData.fullDescription)
      setCompanyData(currentData)
      setCurrentData(currentData ? null : companyData)
      console.log(companyData, "edzae")
    }
  }

  const CompanyBtn = (currentData) => {
    setCompanyName(currentData.companyName)
    setDescription(currentData.description)
    setProfile(currentData.profile)
    setCompanySize(currentData.companySize)
    setLocation(currentData.location)
    setFullDescription(currentData.fullDescription)
    setCompanyData(currentData)
    setCurrentData(currentData ? null : companyData)
    console.log(companyData, "edzae")
  }

  const updateBtnUserRoles = (currentData) => {
    setUserId(currentData.userId)
    setRoleId(currentData.roleId)
    setUpdateDataUserRole(currentData)
    setCurrentData(currentData ? null : updateDataUserRole)
    console.log(updateDataUserRole, "edzae")
  }

  const deleteFunction = (data) => {
    Axios.delete(`http://localhost:8080/api/tables/delete/${status}/${data}`)
      .then((response) => {
        console.log("CAMARVHER")
        setUpdateData(null)
        setInsertData(null)
        getTable(status)
        setCurrentData(data)
      })
    setUpdateData(null)
    setInsertData(null)
  }

  const updateFunction = (data) => {
    Axios.put(`http://localhost:8080/api/update/${data.id}`, {
      companyName: companyName, description: description, profile: profile, companySize: companySize, location: location, wages: wages, workTime: workTime, fullDescription: fullDescription, id: id
    }).then((res) => {
      console.log(res, "uuu")
      getData()
      setUpdateData(null)
    })
    console.log(profile, "ici profile")
  }

  const updateFunctionUserRoles = (id) => {
    Axios.put(`http://localhost:8080/api/update/profile/role/${id}`, {
      role: roleId
    }).then((res) => {
      getData()
      setUpdateDataUserRole(null)
    })
    console.log(profile, "ici profile")
  }

  const SubmitFunction = () => {
    Axios.post('http://localhost:8080/api/insert', {
      companyName: companyName, description: description, profile: profile, companySize: companySize, location: location, wages: wages, workTime: workTime, fullDescription: fullDescription, posterId: currentUser.id
    }).then(() => {
      getTable(status)
      setInsertData(null)
    })
  }

  const SubmitCompanyFunction = () => {
    Axios.post('http://localhost:8080/api/insertCompany', {
      companyName: companyName, description: description, profile: profile, companySize: companySize, location: location, fullDescription: fullDescription,
    }).then(() => {
      getTable(status)
      setCompanyData(null)
    })
  }

  return (
    <>
      {currentUser.roles == "ROLE_ADMIN" ? (
        <div className="jobBox-company">
          <div className='leftSide'>
            {jobs.map((data) => (
              <div className="advertismentBlock">
                <div className="j">
                  <div className="secondBlock">
                    <div className="title"><h1>{data.Tables_in_projectData}</h1></div>
                    <button onClick={() => { showBtn(data) }}>Show table</button>
                    <button onClick={() => { insertNewBtn(data) }}>insert new</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentData && status == "applies" && (
            <div id='rightSide'>
              {/* <p>{JSON.stringify(info)}</p> */}
              <div class="scrollbar" id="style-1">
                <table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>postId</th>
                      <th>applyerId</th>
                      <th>message</th>
                      <th>createdAt</th>
                      <th>updatedAt</th>
                    </tr>
                  </thead>
                  {info.map((infos) => (
                    <tbody>
                      <td>{infos.id}</td>
                      <td>{infos.postId}</td>
                      <td>{infos.applyerId}</td>
                      <td style={{ wordBreak: "break-word" }}>{infos.message}</td>
                      <td>{infos.createdAt}</td>
                      <td>{infos.updatedAt}</td>
                      <button onClick={() => { deleteFunction(infos.id) }}>Delete</button>
                    </tbody>
                  ))}
                </table>
              </div>
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
                <textarea rows="5" cols="33" type="text" name="fullDescription" value={fullDescription} onChange={(e) => {
                  setFullDescription(e.target.value)
                }} />
                <button onClick={() => { updateFunction(updateData) }} >submit</button>
              </div>
            </div>
          )}
          {currentData && status == "companies" && (
            <div id='rightSide'>
              {/* <p>{JSON.stringify(info)}</p> */}
              <div class="scrollbar" id="style-1">
                <table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>profile</th>
                      <th>companySize</th>
                      <th>companyName</th>
                      <th>location</th>
                      <th>fullDescription</th>
                      <th>createdAt</th>
                      <th>updatedAt</th>
                    </tr>
                  </thead>
                  {info.map((infos) => (
                    <tbody>
                      <td>{infos.id}</td>
                      <td>{infos.profile}</td>
                      <td>{infos.companySize}</td>
                      <td>{infos.companyName}</td>
                      <td>{infos.location}</td>
                      <td style={{ wordBreak: "break-word" }}>{infos.fullDesciption}</td>
                      <td>{infos.createdAt}</td>
                      <td>{infos.updatedAt}</td>
                      <button onClick={() => { deleteFunction(infos.id) }}>Delete</button>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          )}
          {currentData && status == "offers" && (
            <div id='rightSide'>
              {/* <p>{JSON.stringify(info)}</p> */}
              <div class="scrollbar" id="style-1">
                <table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>posterId</th>
                      <th>profile</th>
                      <th>companySize</th>
                      <th>description</th>
                      <th>companyName</th>
                      <th>location</th>
                      <th>wages</th>
                      <th>workTime</th>
                      <th>fullDescription</th>
                      <th>createdAt</th>
                      <th>updatedAt</th>
                    </tr>
                  </thead>
                  {info.map((infos) => (
                    <tbody>
                      <td>{infos.id}</td>
                      <td>{infos.posterId}</td>
                      <td>{infos.profile}</td>
                      <td>{infos.companySize}</td>
                      <td>{infos.description}</td>
                      <td>{infos.companyName}</td>
                      <td>{infos.location}</td>
                      <td>{infos.wages}</td>
                      <td>{infos.workTime}</td>
                      <td style={{ wordBreak: "break-word" }}>{infos.fullDesciption}</td>
                      <td>{infos.createdAt}</td>
                      <td>{infos.updatedAt}</td>
                      <button onClick={() => { deleteFunction(infos.id) }}>Delete</button>
                      <button onClick={() => { updateBtn(infos) }}>Update</button>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          )}
          {currentData && status == "roles" && (
            <div id='rightSide'>
              {/* <p>{JSON.stringify(info)}</p> */}
              <div class="scrollbar" id="style-1">
                <table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>name</th>
                      <th>createdAt</th>
                      <th>updatedAt</th>
                    </tr>
                  </thead>
                  {info.map((infos) => (
                    <tbody>
                      <td>{infos.id}</td>
                      <td>{infos.name}</td>
                      <td>{infos.createdAt}</td>
                      <td>{infos.updatedAt}</td>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          )}
          {currentData && status == "user_roles" && (
            <div id='rightSide'>
              {/* <p>{JSON.stringify(info)}</p> */}
              <div class="scrollbar" id="style-1">
                <table>
                  <thead>
                    <tr>
                      <th>userId</th>
                      <th>roleId</th>
                      <th>createdAt</th>
                      <th>updatedAt</th>
                    </tr>
                  </thead>
                  {info.map((infos) => (
                    <tbody>
                      <td>{infos.userId}</td>
                      <td>{infos.roleId}</td>
                      <td>{infos.createdAt}</td>
                      <td>{infos.updatedAt}</td>
                      <button onClick={() => { updateBtnUserRoles(infos) }}>Update</button>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          )}
          {updateDataUserRole && (
            <div id='rightSide'>
              {/* createForm */}
              <div>
                <label>roleId: </label>
                <input type="text" name="roleId" value={roleId} onChange={(e) => {
                  setRoleId(e.target.value)
                }} />
                <button onClick={() => { updateFunctionUserRoles(userId) }} >submit</button>
              </div>
            </div>
          )}
          {insertData && (
            <div>
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
              <textarea rows="5" cols="33" type="text" name="fullDescription" onChange={(e) => {
                setFullDescription(e.target.value)
              }} />
              <a href='/jobs'><button onClick={SubmitFunction}>submit</button></a>
            </div>
          )}
          {companyData && (
            <div>
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
              <label>fullDescription: </label>
              <textarea rows="5" cols="33" type="text" name="fullDescription" onChange={(e) => {
                setFullDescription(e.target.value)
              }} />
              <button onClick={SubmitCompanyFunction}>submit</button>
            </div>
          )}
          {currentData && status == "users" && (
            <div id='rightSide'>
              {/* <p>{JSON.stringify(info)}</p> */}
              <div class="scrollbar" id="style-1">
                <table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>username</th>
                      <th>email</th>
                      <th>password</th>
                      <th>fullName</th>
                      <th>adress</th>
                      <th>number</th>
                      <th>createdAt</th>
                      <th>updatedAt</th>
                    </tr>
                  </thead>
                  {info.map((infos) => (
                    <tbody>
                      <td>{infos.id}</td>
                      <td>{infos.username}</td>
                      <td>{infos.email}</td>
                      <td style={{ wordBreak: "break-word" }}>{infos.password}</td>
                      <td>{infos.fullName}</td>
                      <td>{infos.adress}</td>
                      <td>{infos.number}</td>
                      <td>{infos.createdAt}</td>
                      <td>{infos.updatedAt}</td>
                      <button onClick={() => { deleteFunction(infos.id) }}>Delete</button>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          )}
        </div>

      ) : (
        <Unauthorized />
      )}
    </>
  );
};
export default Database