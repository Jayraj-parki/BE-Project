import React from "react";
import style from "../css/home/Aside.module.scss";
export default function LeftData() {
  return (
    <>
      <table className={style.normal_value + " table caption-top "}>
        <caption className="">
          Normal Values  
          
        </caption>
        <thead>
          <tr>
            <th scope="col">Parameter</th>
            <th scope="col">Normal range</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Haemoglobin</td>
            <td>
              <tr>13.2 to 16.6 g/dL (Men)</tr>
              <tr>11.6 to 15 g/dL (Women)</tr>
            </td>
          </tr>
          <tr>
            <td>MCH</td>
            <td>27 to 31 picograms/cell.</td>
          </tr>
          <tr>
            <td>MCHC</td>
            <td>32 to 36 g/dL</td>
          </tr>
          <tr>
            <td>MCV</td>
            <td>80 to 100 femtoliter</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
