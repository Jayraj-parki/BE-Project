import React, { useEffect } from 'react'
import { useState } from 'react'
import style from "../css/home/feedback.module.scss"
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
export default function Feedback() {
    const [feedback, setFeedback] = useState([])
    const getFeedback = async () => {
        try {
            const result = await fetch(("/getFeedback"), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await result.json()
            setFeedback(data)
        }
        catch (err) {
            console.log("error in getUser" + err)
        }
    }
    useEffect(() => {
        getFeedback()
    }, [])
    return (
        <>
            {
                feedback?.map((value) =>
                    <>
                        <div key={value._id} className={style.card + " card col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 p-0 shadow"} >
                            <div className="row g-2 p-2 pb-2 ">
                                <div className="col-md-12  ">
                                    <h4>
                                        <PersonIcon />{value.userId}
                                    </h4>
                                </div>
                                <div className="col-md-12  ">
                                    <p className="card-title my-1"><ChatIcon />{value.msg} </p>
                                </div>

                            </div>
                        </div> 
                    </>)
            }
        </>
    )
}
