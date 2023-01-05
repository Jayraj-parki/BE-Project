import React, { useState, useEffect } from "react";
import style from "../css/home/RecentComment.module.scss";
import Chat from "./Chat";
import Register from "./Register";
import Login from "./Login";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Button } from "@material-ui/core";
export default function RecentComment(props) {
  // const [comments, setComments] = useState([{}])
  const [post, setPost] = useState([{}]);
  const [userID, setUserID] = useState("");
  const [active, setActive] = useState("noauth");
  // const [user, setUser] = useState()
  const [action, setAction] = useState("Register");
  // const getMessage = async () => {
  //     try {
  //         // e.preventDefault()
  //         const result = await fetch(("/getComment"), {
  //             method: "get",
  //             headers: {
  //                 "Content-type": "application/json"
  //             },
  //         })
  //         const data = await result.json()
  //         setComments([...data.reverse()])

  //     } catch (err) {
  //         console.log("Error in comment" + err)
  //     }
  // }
  // const getUser = async () => {
  //     try {
  //         const result = await fetch(("/data"), {
  //             method: "GET",
  //             headers: {
  //                 "Content-Type": "application/json"
  //             }
  //         })
  //         const data = await result.json()
  //         setUser(data)
  //     }
  //     catch (err) {
  //         console.log("error in getUser" + err)
  //     }
  // }
  const highlight = (index) => {
    // console.log(index)
    const comment = document.getElementById("chat" + index);
    const commentsAll = document.getElementsByClassName(style.msg);
    const arr = [...commentsAll];
    arr?.map((val) => {
      val.style.backgroundColor = "white";
      val.style.color = "black";
    });
    comment.style.backgroundColor = "rgba(0, 0, 0, 0.986)";
    comment.style.color = "rgba(255, 255, 255, 0.986)";
  };

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { id, name, email, question } = user;
  const AskQuestion = async () => {
    const quest = window.prompt("write your question here");
   if(quest==null){
    return
   }
    try {
      const result = await fetch("/postMessage", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId: id, name, email, question: quest }),
      });
      const data = await result.json();
      if (result.status === 201) {
        alert(data.msg);
      } else {
        alert(data.err);
      }
    } catch (err) {
      console.log("Error in Posting" + err);
    }
  };

  const getAllPost = async () => {
    try {
      // e.preventDefault()
      const result = await fetch("/getAllpost", {
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await result.json();
      console.log("hi" + data);
      setPost([...data.reverse()]);
    } catch (err) {
      console.log("Error in comment" + err);
    }
  };
  const getUser = async () => {
    try {
      const result = await fetch("/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      const name = data.fname + " " + data.lname;
      setUser({ ...user, id: data._id, name: name, email: data.email });
    } catch (err) {
      console.log("error in getUser" + err);
    }
  };
  useEffect(() => {
    getUser();
    // getMessage()
    getAllPost();
    props.reload();
  }, [active]);
  return (
    <>
      {!user?.id ? (
        <div
          className={
            style.Auth + " row col-12 my-2 shadow mx-auto  rounded p-3 px-1 px-sm-5"
          }
        >
          <h3 className={style.login + " col-10 mx-auto p-2 text-center"}>
            Login To Check Recent comments
          </h3>
          {action === "Login" ? (
            <Login
              success={() => {
                setActive("auth");
              }}
              handle={() => {
                setAction("Register");
              }}
            />
          ) : (
            <Register
              handle={() => {
                setAction("Login");
              }}
            />
          )}
        </div>
      ) : ( 
        <div
          className={
            style.comment + " row col-12 my-2 shadow mx-auto   rounded p-3 px-sm-5"
          }
        >
          <h3 className={style.heading + " col-10 mx-auto p-2 text-center"}>
            Recent Comments
          </h3>
          <div
            className={
              style.message_container +
              " mt-4 shadow col-12 col-sm-12  border col-lg-5 col-xl-4 mx-auto  d-flex rounded "
            }
          >
            <div className={"row col-10 mx-auto pt-4"}>
              {/* <IconButton onClick={() => document.getElementById("msg").scrollBy({ top: -150, behavior: "smooth" })} className=" col-auto mx-auto   "><KeyboardArrowUpIcon className={style.icon + " m-0"} /></IconButton> */}
              <Button
                onClick={AskQuestion}
                className={style.quest + " text-light text-capitalize"}
              >
                Ask New Question
              </Button>
              <IconButton onClick={getAllPost} className=" col-auto mx-auto "><RefreshIcon className={style.icon + " m-0"} /></IconButton>
              {/* <IconButton onClick={() => document.getElementById("msg").scrollBy({ top: 150, behavior: "smooth" })} className=" col-auto mx-auto "><KeyboardArrowDownIcon className={style.icon + " m-0"} /></IconButton> */}
            </div>
            <div
              id="msg"
              className={style.msg_container + " row  mx-auto p-3 col-12  d-flex justify-content-center align-items-start py-1"}
            >
              
              {post?.map((value, index) => {
                return (
                  <Button
                  onClick={() => {setUserID(value?._id)}}
                    key={index}
                    id={"chat" + index}
                    className={
                      style.msg + " d-block col-12 shadow  my-2 mx-auto py-2 rounded "
                    }
                  >
                    <h6 className="p-0 m-0 col-8  text-start">{value.email}</h6>
                    <p className="p-2 rounded my-2 col-12">{value.question}?</p>
                  </Button>
                );
              })}
            </div>
          </div>
          <Chat id={userID} email={user?.email} />
        </div>
      )}
    </>
  );
}
