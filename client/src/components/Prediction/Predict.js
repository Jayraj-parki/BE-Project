import { Button } from "@material-ui/core";
import React from "react";
import Navbar from "../Navbar";
import style from "./predict.module.scss";
import AcUnitIcon from "@mui/icons-material/AcUnit";
export default function Predict() {
  return (
    <>
      <div className={style.predict + " row mx-auto col-12 col-lg-12 col-xxl-12  p-3"}>
        <div
          className={
            style.content +
            "  col-12 col-sm-12 col-md-7 col-lg-12 col-xl-8 col-xxl-6 me-auto pb-3 my-xxl-5    "
          }
        >
          <h1 className="col-11 col-sm-12 col-md-11  mx-auto  ">
            Predict Anemia..!
          </h1>
          <h4 className="col-10 col-sm-12 col-md-11 mx-auto ">
            <AcUnitIcon />
            Predict anemia using CBC report
          </h4>
          <h4 className="col-10 col-sm-12 col-md-11 mx-auto ">
            <AcUnitIcon />
            Check your previous Result
          </h4>
          <h4 className="col-10 col-sm-12 col-md-11 mx-auto ">
            <AcUnitIcon />
            Ai based prediction
          </h4>
        </div>
        <div
          className={
            style.AiImg +
            "  col-12 col-sm-12 col-md-7 col-lg-12 col-xl-8 col-xxl-6 me-auto pb-3 my-xxl-5    "
          }
        >
          <img className={style.ai + " col-6 col-sm-5 col-md-4 col-lg-4 col-xl-3 ms-auto "} src={"/Ai.png"} alt="" />

        </div>




      </div>

      {/* <div className={style.predict + " container-fluid p-0 "}>
        <div className={style.navbar + " row "}>
          <Navbar />
        </div>
        <div className={style.formContainer + " row col-12 p-5"}>
          <div className={style.formInput + " col-6 p-5"}>
            <form
              className={
                style.form +
                " row col-8 p-0 mx-auto d-flex justify-content-between"
              }
            >
              <div className="row col-12 my-2 mx-auto">
                <input
                  className="p-2"
                  type="number"
                  placeholder="Haemoglobin"
                />
              </div>
              <div className="row col-12 my-2 mx-auto">
                <input className="p-2" type="number" placeholder="MCH" />
              </div>
              <div className="row col-12 my-2 mx-auto">
                <input className="p-2" type="number" placeholder="MCHC" />
              </div>
              <div className="row col-12 my-2 mx-auto">
                <input className="p-2" type="number" placeholder="MCV" />
              </div>
              <div className="row col-12 my-2 mx-auto p-0">
                <span className="text-center d-flex justify-content-start align-items-center">
                  <input
                    className=" me-2"
                    type="radio"
                    name="gender"
                    value="1"
                  />
                  Male
                </span>
                <span className="text-center d-flex justify-content-start align-items-center">
                  <input
                    className=" me-2"
                    type="radio"
                    name="gender"
                    value="0"
                  />
                  Female
                </span>
              </div>
              <div
                className={
                  style.btns +
                  "  col-12 my-2 mx-auto d-flex justify-content-between "
                }
              >
                <Button className={style.checkBtn}>Check The Result</Button>
                <Button type="reset" className={style.resetBtn}>
                  Check The Result
                </Button>
              </div>
            </form>
          </div>
          <div className={style.formOutput}></div>
        </div>
      </div> */}
    </>
  );
}
