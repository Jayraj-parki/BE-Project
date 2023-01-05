import React from "react";
import style from "../css/home/SocialMedia.module.scss";
import Button from "@material-ui/core/Button";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { NavLink } from "react-router-dom";
export default function SocialMedia() {
  return (
    <>
      <div
        className={
          style.containers +
          " row col-10 p-3 mx-auto d-flex m-0  justify-content-evenly"
        }
      >
        <span className="fs-5 text-light border-bottom pb-3 text-center">Follow our Social Media accounts for daily updates</span>
         <div className={style.card + " col-md-5  col-xl-3  d-flex p-3 justify-content-center"}>
          <Button className={style.whatbtn+ " row col-10 mx-auto "}>
            <div className={style.iconContainer + " col-12 p-3 "}>
              <WhatsAppIcon className={style.icon}/>
              <p className="col-12">WhatsApp</p>
            </div>
          </Button>
        </div>
        <div className={style.card + "  col-md-5 col-xl-3  d-flex p-3 justify-content-center"}>
          <Button className={style.telbtn+ " row col-10 mx-auto "}>
            <div className={style.iconContainer + " col-12 p-3 "}>
              <TelegramIcon className={style.icon}/>
              <p className="col-12">Telegram</p>
            </div>
          </Button>
        </div>
        <div className={style.card + "  col-md-5 col-xl-3  d-flex p-3 justify-content-center"}>
          <Button className={style.youbtn+ " row col-10 mx-auto "}>
            <div className={style.iconContainer + " col-12 p-3 "}>
              <YouTubeIcon className={style.icon}/>
              <p className="col-12">YouTube</p>
            </div>
          </Button>
        </div>
        <div className={style.card + "  col-md-5 col-xl-3  d-flex p-3 justify-content-center"}>
          <Button className={style.instabtn+ " row col-10 mx-auto "}>
            <div className={style.iconContainer + " col-12 p-3 "}>
              <InstagramIcon className={style.icon}/>
              <p className="col-12">Instagram</p>
            </div>
          </Button>
        </div>
        
      </div>
    </>
  );
}
