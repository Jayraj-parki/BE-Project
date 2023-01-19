import React, { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";
import Predict from './Prediction/Predict'
import style from "./css/home/anemiaPredict.module.scss"
import Navbar from './Navbar'
import Footer from './Footer';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import axios from "axios"
// import VideoCard from './home/VideoCard';
import HashLoader from "react-spinners/HashLoader";
export default function AnemiaPredict() {

    const [status, setStatus] = useState(false);
    const [doctors, setDoctors] = useState([{}])
    const [food, setFood] = useState([]);
    const [hospitals, setHospitals] = useState([{}])
    const [feedback, setFeedback] = useState("  ")
    const [user, setUser] = useState()
    const [active, setActive] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [loading, setLoading] = useState(false);
    const [cbc, setCbc] = useState({
        gender: "",
        haemoglobin: "",
        mch: "",
        mchc: "",
        mcv: "",
    })

    

    const clearForm = () => {
        setCbc({});
        setActive(false)
        setStatus(false)
    }
    const handleForm = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCbc({ ...cbc, [name]: value })
    }
    const showPrediction = (e) => {
        e.preventDefault()
        const { gender, haemoglobin, mch, mchc, mcv } = cbc;
        if (!gender || !haemoglobin.trim() || !mch.trim() || !mchc.trim() || !mcv.trim()) {
            alert("please fill form correctly");
            return;
        }
        else if (haemoglobin < 5 || haemoglobin > 20) {
            alert("Invalid value for Haemoglobin");
        }
        else if (mch < 10 || mch > 50) {
            alert("Invalid value for MCH");
        }
        else if (mchc < 18 || mchc > 50) {
            alert("Invalid value for MCHC");
        }
        else if (mcv < 50 || mcv > 120) {
            alert("Invalid value for MCV");
        }
        else {
            let customPrediction = 0;
            setActive(true);
            setLoading(true);
            // setTimeout(() => {
            //     setLoading(false)
            // }, 5000)
            if (Number(gender) == 1) {
                if (Number(haemoglobin) < 14 || Number(haemoglobin) > 16.5 || Number(mchc) < 33.4 || Number(mchc) > 35.5 || Number(mch) < 27 || Number(mch) > 33.5 || Number(mcv) < 80 || Number(mcv) > 100) {
                    customPrediction = 1;
                }
            }
            else {
                if (Number(haemoglobin) < 11 || Number(haemoglobin) > 15.5 || Number(mchc) < 33.4 || Number(mchc) > 35.5 || Number(mch) < 27 || Number(mch) > 33.5 || Number(mcv) < 80 || Number(mcv) > 100) {
                    customPrediction = 1;
                    console.log(Number(mchc) < 33.4)
                }
            }
            const params = {
                Gender: Number(gender),
                Hemoglobin: Number(haemoglobin),
                MCH: Number(mch),
                MCHC: Number(mchc),
                MCV: Number(mcv),
            }
            axios
                .post('http://localhost:8080/prediction', params)
                .then((res) => {
                    const data = res.data.data
                    
                    // const custom=data?.result+customPrediction
                    // console.log(data)
                    if (data?.result <= 50) {
                        setStatus(false);
                    }
                    else {
                        setStatus(true);
                    }
                    // console.log(data?.result + " "+ customPrediction)

                    setLoading(false)
                })
                .catch((error) => {
                    setLoading(false)
                    alert(`Error: ${error.message}`)
                })
        }

    }
    const saveFeedBack = async () => {
        if (!feedback.trim()) {
            alert("please write feedback before submit")
        } else {

            try {
                const result = await fetch("/saveFeedback", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            userId: user?.fname + " " + user?.lname,
                            msg: feedback
                        }),
                });
                const data = await result.json();
                if (result.status === 201) {
                    alert(data.msg);
                    setFeedback("")
                } else {
                    alert(data.err);
                }
            } catch (err) {
                console.log("Error in Posting" + err);
            }
        }
    }
    const getUser = async () => {
        try {
            const result = await fetch(("/data"), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await result.json()
            setUser(data)
        }
        catch (err) {
            console.log("error in getUser" + err)
        }
    }
    const getHospital = async () => {
        try {
            // e.preventDefault()
            const result = await fetch(("/getHospital"), {
                method: "get",
                headers: {
                    "Content-type": "application/json"
                },
            })
            const data = await result.json()
            // console.log(data)
            setHospitals([...data])

        } catch (err) {
            console.log("Error in client getHospital")
        }
    }
    const getDoctor = async () => {
        try {
            // e.preventDefault()
            const result = await fetch(("/getDoctor"), {
                method: "get",
                headers: {
                    "Content-type": "application/json"
                },
            })
            const data = await result.json()

            setDoctors([...data])

        } catch (err) {
            console.log("Error in doctor" + err)
        }
    }
    const getFood = async () => {
        getHospital()
        try {
            // e.preventDefault()
            const result = await fetch(("/food"), {
                method: "get",
                headers: {
                    "Content-type": "application/json"
                },
            })
            const data = await result.json()
            // console.log(data)
            setFood(data)

        } catch (err) {
            console.log("Error in doctor" + err)
        }
    }
    useEffect(() => {
        getUser()
        getDoctor();
        getHospital();
        getFood()
    }, [])
    return (
        <>
            <div className={style.anemiaPredict + " container-fluid p-0 "}>
                <div className={style.navbar + " row "}>
                    <Navbar />
                </div>
                <div className={style.content + " row "}>
                    <Predict />
                </div>
            </div>
            <div className={style.predictForm + " container-fluid p-0 "}>

                <div className={style.formContainer + " row col-11  mx-auto d-flex justify-content-between p-5  "}>
                    <div className={style.formInput + " col-xl-6 p-2 p-xl-3 p-xxl-5   shadow"}>
                        <form
                            className={
                                style.form +
                                " row col-sm-11 col-md-8 p-0 mx-auto d-flex justify-content-between"
                            }
                        >
                            <h4 className='text-center border-bottom pb-2 mb-3'>Enter your CBC Detail</h4>
                            <div className="row col-12 my-2 mx-auto">
                                <label className='p-0 m-0' for="hmg">Haemoglobin</label>
                                <input
                                    className="p-2 border shadow-sm"
                                    type="number"
                                    id="hmg"
                                    placeholder="Haemoglobin(5-30)"
                                    name="haemoglobin"
                                    value={cbc.haemoglobin}
                                    min="5"
                                    max="30"
                                    onChange={(e) => handleForm(e)}
                                />
                            </div>
                            <div className="row col-12 my-2 mx-auto">
                                <label className='p-0 m-0' for="mch">MCH</label>
                                <input name="mch"
                                    id="mch"
                                    min="10"
                                    max="50"
                                    value={cbc.mch}
                                    onChange={(e) => handleForm(e)} className="p-2 border shadow-sm" type="number" placeholder="MCH(10-50)" />
                            </div>
                            <div className="row col-12 my-2 mx-auto">
                                <label className='p-0 m-0' for="mchc">MCHC</label>
                                <input name="mchc"
                                    id="mchc"
                                    min="18"
                                    max="50"
                                    value={cbc.mchc}
                                    onChange={(e) => handleForm(e)} className="p-2 border shadow-sm" type="number" placeholder="MCHC(15-50)" />
                            </div>
                            <div className="row col-12 my-2 mx-auto">
                                <label className='p-0 m-0' for="mcv">MCV</label>
                                <input id="mcv" name="mcv"
                                    min="50"
                                    max="120"
                                    value={cbc.mcv}
                                    onChange={(e) => handleForm(e)} className="p-2 border shadow-sm" type="number" placeholder="MCV(50-120)" />
                            </div>
                            <div className="row col-12 my-2 mx-auto p-0">
                                <span className="text-center d-flex justify-content-start align-items-center">
                                    <input
                                        className=" me-2"
                                        type="radio"
                                        name="gender"
                                        value={"1"}
                                        id="male"
                                        onClick={(e) => handleForm(e)}
                                    />
                                    <label className='p-0 m-0' for="male">Male</label>

                                </span>
                                <span className="text-center d-flex justify-content-start align-items-center">
                                    <input
                                        className=" me-2"
                                        type="radio"
                                        name="gender"
                                        value={"0"}
                                        id="female"
                                        onClick={(e) => handleForm(e)}
                                    />
                                    <label className='p-0 m-0' for="female">Female</label>

                                </span>
                            </div>
                            <div
                                className={
                                    style.btns +
                                    " row col-12 my-2 mx-auto d-flex justify-content-between "
                                }
                            >
                                <Button onClick={clearForm} type="reset" className={style.resetBtn + " bg-dark col-12 col-sm-5 text-light text-capitalize px-3"}>
                                    Clear the Form
                                </Button>
                                <Button type='submit' onClick={(e) => showPrediction(e)} className={style.checkBtn + " col-12 mt-3 mt-sm-0 col-sm-5 text-light text-capitalize px-3"}>Check The Result</Button>
                            </div>
                        </form>
                    </div>
                    <div className={style.formOutput + " row mx-auto col-xl-6 mt-5 mt-xl-0 py-0 px-3"}>
                        <div className={style.result + ' row d-flex justify-content-center align-items-center  col-12 mb-2 mx-auto p-0 shadow'}>
                            <h3 className='p-2 m-0 px-4 '>Result Screen</h3>
                            <div className={style.resultScreen + " d-flex flex-column justify-content-center p-0"}>
                                {
                                    !active ?
                                        <>
                                            <span className='text-center mx-auto mb-3'>Nothing to show! please fill the form and Submit.</span>
                                        </>
                                        :
                                        <>
                                            {
                                                loading ?
                                                    <>
                                                        <HashLoader className='mx-auto' color={"#0984e3"} loading={loading} size={50} />
                                                        <span className='text-center mx-auto mb-3'>Loading . . .</span>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            !status ?
                                                                <>
                                                                    <span className='text-center mx-auto mb-3'>Your CBC report is normal.</span>
                                                                    <h3 className='col-10 bg-success mx-auto rounded text-center p-2 text-light'>Normal Report</h3>
                                                                </>
                                                                :
                                                                <>
                                                                    <span className='text-center mx-auto mb-3'>You are Anemia positive please read below guidelines.</span>
                                                                    <h3 className='col-10 bg-danger mx-auto rounded text-center p-2 text-light'>Anemia Positive</h3>
                                                                </>

                                                        }

                                                    </>

                                            }

                                        </>
                                }
                            </div>
                        </div>
                        <div className={style.feedback + ' row d-flex justify-content-center align-items-center col-12 mt-3 py-3 mx-auto shadow'}>
                            <h3>Feedback</h3>
                            <span className='m-0'>Please provide Feedback about your Prediction Result</span>
                            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="form-control m-0" id="exampleFormControlTextarea1" rows="3"></textarea>
                            <Button onClick={saveFeedBack} className='col-6 bg-success text-light'>Submit Feedback</Button>
                        </div>
                    </div>
                </div>
                

                {
                    status &&

                    <>
                        <div className={style.guide + " row col-11  mx-auto d-flex justify-content-between p-5  "}>
                            <h2 className='text-center border-bottom pb-3'>Read Guidelines</h2>
                            <h5 className='mt-4'><AcUnitIcon className='mx-2' />Contact with our anemia specialist doctors</h5>
                            <div className={style.doctors + " d-flex"}>
                                {
                                    doctors.map((value, index) =>
                                        <div key={index} className={style.doctor + " card col-10 col-sm-4 col-md-2 shadow  mx-auto gx-0 gy-2"}>
                                            <img src={"https://raw.githubusercontent.com/Jayraj-parki/pbl-images/master" + "/images/doctors/" + value.path} className="card-img-top col-12" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{value.name}</h5>
                                                <p className="card-text">{value.phone}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <h5 className='mt-4'><AcUnitIcon className='mx-2' />Eat Healthy Food</h5>
                            <div className={style.doctors + " d-flex"}>
                                {
                                    food.map((value, index) =>
                                        <div key={index} className={style.doctor + " card col-10 col-sm-4 col-md-2 shadow  mx-auto gx-0 gy-2"}>
                                            <img src={"https://raw.githubusercontent.com/Jayraj-parki/pbl-images/master" + "/images/nutritionalFood/" + value.path} className="card-img-top col-12" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{value.title}</h5>
                                                {/* <p className="card-text">{value.phone}</p> */}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <h5 className='mt-4'><AcUnitIcon className='mx-2' />Learn about Anemia and Nutritional Food</h5>
                            <div className={style.doctors + " d-flex"}>
                                <div className={style.doctor + " card col-12 col-sm-5 col-md-4 shadow  mx-auto gx-0 gy-2"}>

                                    <div className={style.videoCard + " card col-md-12  mx-auto gx-0 gy-2"} >
                                        <video className=" col-12" controls >
                                            <source src={"https://raw.githubusercontent.com/Jayraj-parki/pbl-images/master" + "/videos/" + "1.mp4"} type="video/mp4" />
                                        </video>
                                        <div className="card-body">
                                            <h5 className="card-title">{"What is Anaemia ? || Learn everything about it"}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.doctor + " card col-12 col-sm-5 col-md-4 shadow  mx-auto gx-0 gy-2"}>
                                    <div className={style.videoCard + " card col-md-12  mx-auto gx-0 gy-2"} >
                                        <video className=" col-12" controls >
                                            <source src={"https://raw.githubusercontent.com/Jayraj-parki/pbl-images/master" + "/videos/" + "3.mp4"} type="video/mp4" />
                                        </video>
                                        <div className="card-body">
                                            <h5 className="card-title">{"Health Tips  Top 10 Foods to Fight Anemia"}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.doctor + " card col-12 col-sm-5 col-md-4  shadow  mx-auto gx-0 gy-2"}>
                                    <div className={style.videoCard + " card col-md-12  mx-auto gx-0 gy-2"} >
                                        <video className=" col-12" controls >
                                            <source src={"https://raw.githubusercontent.com/Jayraj-parki/pbl-images/master" + "/videos/" + "2.mp4"} type="video/mp4" />
                                        </video>
                                        <div className="card-body">
                                            <h5 className="card-title">{"All About Nutrition Balanced Diet"}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.doctor + " card col-12 col-sm-5 col-md-4 shadow  mx-auto gx-0 gy-2"}>

                                    <div className={style.videoCard + " card col-md-12  mx-auto gx-0 gy-2"} >
                                        <video className=" col-12" controls >
                                            <source src={"https://raw.githubusercontent.com/Jayraj-parki/pbl-images/master" + "/videos/" + "4.mp4"} type="video/mp4" />
                                        </video>
                                        <div className="card-body">
                                            <h5 className="card-title">{"Anaemia (Types of Anaemia) classification"}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h5 className='mt-4'><AcUnitIcon className='mx-2' />Take appointment in your nearest hospital</h5>
                            <div className={style.doctors + " d-flex"}>
                                {
                                    hospitals.map((value) =>
                                        <div key={value._id} className={style.card + " card col-12 col-sm-5 col-xl-5 mx-3 p-0 shadow"} >
                                            <div className="row g-2 p-2 pb-2 ">
                                                <div className="col-md-4  ">
                                                    <img src={"https://raw.githubusercontent.com/Jayraj-parki/pbl-images/master" + "/images/hospital/" + value.path} className="img-fluid rounded-start" alt="..." />
                                                </div>
                                                <div className="col-md-8  my-auto ">
                                                    <div className={"card-body col-12 mt-auto p-0 " + style.body}>
                                                        <h3 className="card-title my-1">{value.name}</h3>
                                                        <p className="card-text mt-auto  p-2">{value.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button onClick={() => window.open(value.link, "_blank")} className={style.appointment + "  col-xl-6 text-center ps-3 "}>Take Appointment</Button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </>
                }
                <div id="contact" className={style.footer + " row col-12 mx-auto"}>
                    <Footer />
                </div>
            </div>
        </>
    )
}
