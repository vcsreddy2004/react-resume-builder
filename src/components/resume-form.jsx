import { useState } from "react";
import ResumeService from "../servises/ResumeService";
import { useNavigate } from "react-router-dom";
let ResumeForm = () => {
    let [resumeData,setResumeData] = useState({
        name:"",
        email:"",
        phNumber:"",
        programingLanguages:"",
        techStack:"",
        masterType:"",
        masterCollageName:"",
        masterBranch:"",
        masterResultType:'',
        masterResults:"",
        bachelorType:"",
        bachelorCollageName:"",
        bachelorBranch:"",
        bachelorResultType:"",
        bachelorResult:"",
        diplomaType:"",
        diplomaCollageName:"",
        diplomaBranch:"",
        diplomaResultType:"",
        diplomaResult:"",
        experienceRole1:"",
        experienceCompany1:"",
        experienceLocation1:"",
        experience1StartDate:"",
        experience1EndDate:"",
        experience1Descreption:"",
        experienceRole2:"",
        experienceCompany2:"",
        experienceLocation2:"",
        experience2StartDate:"",
        experience2EndDate:"",
        experience2Descreption:"",
        experienceRole3:"",
        experienceCompany3:"",
        experienceLocation3:"",
        experience3StartDate:"",
        experience3EndDate:"",
        experience3Descreption:"",
        project1Name:"",
        project1Descreption:"",
        project2Name:"",
        project2Descreption:"",
        project3Name:"",
        project3Descreption:"",
        resumeTitle:"",
    });
    let [loading,setLoading ]= useState(true);
    let [showMasters,setShowMasters] = useState(null);
    let [experienceCount, setExperienceCount] = useState(0);
    let [projectsCount, setProjectCount] = useState(0);
    let [resumeTitleError,setResumeTitleError] = useState("");
    let navigate = useNavigate();
    let setExperienceCounter = (event) => {
        if(experienceCount<3)
        {
            setExperienceCount((prev)=>prev+=1)
        }
    }
    let setProjectCounter = () => {
        if(projectsCount<3)
        {
            setProjectCount((prev)=>prev+1)
        }
    }
    let handleCheckboxChange = (event) => {
        setShowMasters((prev)=>!prev);
    }
    let checkPhoneNumber = (event) => {
        if(event.target.value.length!==10)
        {
            document.querySelector("#phNumberCount").classList.remove("text-success");
            document.querySelector("#phNumberCount").classList.add("text-danger");
        }
        else
        {
            document.querySelector("#phNumberCount").classList.remove("text-danger");
            document.querySelector("#phNumberCount").classList.add("text-success");
        }
        setResumeData((state)=>({
            ...state,
            phNumber:event.target.value
        }));
    }
    let updateResumeData = (event) => {
        setResumeData((state)=>({
            ...state,
            [event.target.name]:event.target.value,
        }));
    }
    let submit=()=>{
        let token = localStorage.getItem("userToken");
        if(token)
        {   let resume = {
                "resume":resumeData
            }
            if(resumeData.experienceCompany1 !== "")
            {
                if(resumeData.experienceLocation1 === "" || resumeData.experience1Descreption === "" || resumeData.experience1StartDate === "" || resumeData.experience1EndDate === "" || resumeData.experienceRole1 === "")
                {
                    alert("all expirence feilds must be full");
                    return;
                }
            }
            if(resumeData.experienceCompany2 !== "")
            {
                if(resumeData.experienceLocation2 === "" || resumeData.experience2Descreption === "" || resumeData.experience2StartDate === "" || resumeData.experience2EndDate === "" || resumeData.experienceRole2 === "")
                {
                    alert("all expirence feilds must be full");
                    return;
                }
            }
            if(resumeData.experienceCompany3 !== "")
            {
                if(resumeData.experienceLocation3 === "" || resumeData.experience3Descreption === "" || resumeData.experience3StartDate === "" || resumeData.experience3EndDate === "" || resumeData.experienceRole3 === "")
                {
                    alert("all expirence feilds must be full");
                    return;
                }
            }
            if(resumeData.project1Name !== "")
            {
                if(resumeData.project1Descreption === "")
                {
                    alert("if project name specifed project descreption must specified");
                    return;
                }
            }
            if(resumeData.project2Name !== "")
            {
                if(resumeData.project2Descreption === "")
                {
                    alert("if project name specifed project descreption must specified");
                    return;
                }
            }
            if(resumeData.project3Name !== "")
            {
                if(resumeData.project3Descreption === "")
                {
                    alert("if project name specifed project descreption must specified");
                    return;
                }
            }
            setLoading(true);
            ResumeService.upload(resume,token).then((res)=>{
                navigate(`/view-resume/${res.data._id}`);
            }).catch((err)=>{
                setResumeTitleError(()=>(err.response.data.errorMessage));
                setLoading(false);
            });
        }
    }
    return (
        <>
            {loading ? 
                <div className="d-flex align-items-center justify-content-center vh-100">
                    <div className="spinner-border text-success display-1"></div>
                </div> 
            : 
            <div className="container mt-5">
                <div className="card shadow-lg mb-5">
                    <div className="card-header">
                        Resume Form
                    </div>
                    <div className="card-body">
                        <div className="card col-md-12 shadow-lg">
                            <div className="card-header bg-dark text-white">
                                Personal data
                            </div>
                            <div className="card-body">
                                <table className="col-md-12">
                                    <tbody>
                                        <tr>
                                            <td className="col-md-6">
                                                <span>Name <br /></span>
                                                <input type="text" name="name" onChange={updateResumeData} placeholder="Enter your name" className="col-md-12" />
                                                &nbsp;
                                            </td>
                                            <td>
                                                <span>Phone Number <br /></span>
                                                <input type="number" name="phNumber" onChange={checkPhoneNumber} placeholder="Enter your Phone number" className="col-md-12" />
                                                <span id="phNumberCount">{resumeData.phNumber.length}</span>/10
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>Email <br /></span>
                                                <input type="email" name="email" onChange={updateResumeData} placeholder="Enter your email address" className="col-md-12" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card col-md-12 shadow-lg mt-3">
                            <div className="card-header bg-dark text-white">
                                Skills
                            </div>
                            <div className="card-body">
                                <table className="col-md-12">
                                    <tbody>
                                        <tr>
                                            <td className="col-md-6">
                                                <span>Programming Languages <br /></span>
                                                <input type="text" name="programingLanguages" onChange={updateResumeData} placeholder="ex:- c,c++,java..." className="col-md-12" />
                                            </td>
                                            <td>
                                                <span>Tech Stack <br /></span>
                                                <input type="text" name="techStack" onChange={updateResumeData} placeholder="ex:- Django, spring boot..." className="col-md-12" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>Tools <br /></span>
                                                <input type="text" name="tools" onChange={updateResumeData} placeholder="ex:- git,jira,ubantu..." className="col-md-12" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card col-md-12 shadow-lg mt-3">
                            <div className="card-header bg-dark text-white">
                                Education
                            </div>
                            <div className="card-body">
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showMastersCheckbox"
                                        checked={showMasters}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="showMastersCheckbox">
                                        Completed Masters
                                    </label>
                                </div>
                                {showMasters && (
                                    <div className="card shadow-lg mt-3">
                                        <div className="card-header bg-dark text-white">
                                            Masters
                                        </div>
                                        <div className="card-body">
                                            <table className="col-md-12">
                                                <tbody>
                                                    <tr>
                                                        <td className="col-md-6">
                                                            <span>Type <br /></span>
                                                            <select name="masterType" onChange={updateResumeData} className="col-md-12">
                                                                <option value="" disabled selected>
                                                                    Select your degree
                                                                </option>
                                                                <option value="MTech">MTech</option>
                                                                <option value="MSc">MSc</option>
                                                                <option value="MBA">MBA</option>
                                                                <option value="MA">MA</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <span>College Name <br /></span>
                                                            <input type="text" name="masterCollageName" onChange={updateResumeData} className="col-md-12" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span>Branch <br /></span>
                                                            <input type="text" name="masterBranch" onChange={updateResumeData} className="col-md-12" />
                                                        </td>
                                                        <td> 
                                                            <input type="radio" id="CGPA" name="masterResultType" value="CGPA" onChange={updateResumeData} />
                                                            <label htmlFor="CGPA">CGPA</label>
                                                            <input type="radio" id="percentage" name="masterResultType" value="Percentage" onChange={updateResumeData} />
                                                            <label htmlFor="percentage">Percentage</label>
                                                            <input type="email" name="masterResults" onChange={updateResumeData} className="col-md-12" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                <div className="card shadow-lg mt-3">
                                    <div className="card-header bg-dark text-white">
                                        Bachelors
                                    </div>
                                    <div className="card-body">
                                        <table className="col-md-12">
                                            <tbody>
                                                <tr>
                                                    <td className="col-md-6">
                                                        <span>Type <br /></span>
                                                        <select name="bachelorType" onChange={updateResumeData} className="col-md-12">
                                                            <option value="" disabled selected>
                                                                Select your bachelor's degree
                                                            </option>
                                                            <option value="BTech">BTech</option>
                                                            <option value="BSc">BSc</option>
                                                            <option value="BBA">BBA</option>
                                                            <option value="BA">BA</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <span>College Name <br /></span>
                                                        <input type="text" name="bachelorCollageName" onChange={updateResumeData} className="col-md-12" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span>Branch <br /></span>
                                                        <input type="text" name="bachelorBranch" onChange={updateResumeData} className="col-md-12" />
                                                    </td>
                                                    <td> 
                                                        <input type="radio" id="CGPA" name="bachelorResultType" value="CGPA" onChange={updateResumeData} />
                                                        <label htmlFor="CGPA">CGPA</label>
                                                        <input type="radio" id="percentage" name="bachelorResultType" value="Percentage" onChange={updateResumeData} />
                                                        <label htmlFor="percentage">Percentage</label>
                                                        <input type="email" name="bachelorResult" onChange={updateResumeData} className="col-md-12" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card shadow-lg mt-3">
                                    <div className="card-header bg-dark text-white">
                                        Diploma / Intermediate
                                    </div>
                                    <div className="card-body">
                                        <table className="col-md-12">
                                            <tbody>
                                                <tr>
                                                    <td className="col-md-6">
                                                        <span>Type <br /></span>
                                                        <select name="diplomaType" onChange={updateResumeData} className="col-md-12" >
                                                            <option value="" disabled selected>
                                                                Select your bachelor's degree
                                                            </option>
                                                            <option value="Diploma">Diploma</option>
                                                            <option value="Intermediate">Intermediate</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <span>College Name <br /></span>
                                                        <input type="text" name="diplomaCollageName" onChange={updateResumeData} className="col-md-12" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span>Branch <br /></span>
                                                        <input type="text" name="diplomaBranch" onChange={updateResumeData} className="col-md-12" />
                                                    </td>
                                                    <td> 
                                                        <input type="radio" id="CGPA" name="diplomaResultType" value="CGPA" onChange={updateResumeData} />
                                                        <label htmlFor="CGPA">CGPA</label>
                                                        <input type="radio" id="percentage" name="diplomaResultType" value="Percentage" onChange={updateResumeData} />
                                                        <label htmlFor="percentage">Percentage</label>
                                                        <input type="email" name="diplomaResult" onChange={updateResumeData} className="col-md-12" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card col-md-12 shadow-lg mt-3">
                            <div className="card-header bg-dark text-white">
                                Experience
                            </div>
                            <div className="card-body">
                            {Array.from({ length: experienceCount }, (_, i) => (
                                <div className="card shadow-lg mt-3">
                                    <div className="card-header bg-dark text-white">
                                        Experience {i+1}
                                    </div>
                                    <div className="card-body">
                                        <table className="col-md-12">
                                            <tr>
                                                <td className="col-md-6">
                                                    <span>Role<br/></span>
                                                    <input type="text" name={`experienceRole${i+1}`} onChange={updateResumeData} className="col-md-12" />
                                                </td>
                                                <td>
                                                    <span>Company</span>
                                                    <input type="text" name={`experienceCompany${i+1}`} onChange={updateResumeData} className="col-md-12" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Location</span>
                                                    <input type="text" name={`experienceLocation${i+1}`} onChange={updateResumeData} className="col-md-12" />
                                                </td>
                                                <td>
                                                    <tr>
                                                        <td>
                                                            <span>Start Date</span> 
                                                        </td>
                                                        <td>
                                                            <span>End Date<br/></span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="date" name={`experience${i+1}StartDate`} onChange={updateResumeData} className="col-md-12" />
                                                        </td>
                                                        <td>
                                                            <input type="date" name={`experience${i+1}EndDate`} onChange={updateResumeData} className="col-md-12" />
                                                        </td>
                                                    </tr>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Description</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <textarea name={`experience${i+1}Descreption`} onChange={updateResumeData} maxLength={1000} className="col-md-12"></textarea>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            ))}
                                <input type="button" value="+ Add" onClick={setExperienceCounter} className="bg-success text-white border-0" />
                            </div>
                        </div>
                        <div className="card col-md-12 shadow-lg mt-3">
                            <div className="card-header bg-dark text-white">
                                Projects
                            </div>
                            <div className="card-body">
                            {Array.from({ length: projectsCount }, (_, i) => (
                                <div className="card shadow-lg mt-3">
                                    <div className="card-header bg-dark text-white">
                                        Project {i+1}
                                    </div>
                                    <div className="card-body">
                                        <table className="col-md-12">
                                            <tr>
                                                <td className="col-md-6">
                                                    <span>Project Name<br/></span>
                                                    <input type="text" name={`project${i+1}Name`} onChange={updateResumeData} className="col-md-12" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Project Descreption</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <textarea name={`project${i+1}Descreption`} onChange={updateResumeData} maxLength={1000} className="col-md-12"></textarea>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            ))}
                                <input type="button" value="+ Add" onClick={setProjectCounter} className="bg-success text-white border-0" />
                            </div>
                        </div>
                    </div>
                    <div className="card col-md-12 shadow-lg mt-3">
                        <div className="card-header bg-dark text-white">
                            Resume Title
                        </div>
                        <div className="card-body">
                            <span>Enter Resume Title</span>
                            <input type="text" name='resumeTitle' onChange={updateResumeData} placeholder="resume title should be unique" className="col-md-12" />
                            <span className="text-danger">{resumeTitleError}</span>
                        </div>
                    </div>
                    <input type="button" value="Submit" onClick={submit} className="btn btn-success col-md-6 m-auto text-white mb-3 border-0" />
                </div>
            </div>
            }
        </>
    );
}
export default ResumeForm