import { Grid, Card, Button } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import {
  Videocam,
  TextSnippet,
  CancelPresentation,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ArrowBackIos
} from "@material-ui/icons";

const AppicationScreen = (props) => {
const [dropOn, setDropOn] = useState(false);
  return (
    <div>
      {props.application ? (
        <Grid item xs={12} className="headerBoxes">
          <div className="main-div-tag">
            <div>
              <ArrowBackIos />
            </div>
            <div>[FirstName][LastName]</div>
          </div>

          <div className="main-div clickonfirstname">
            <div className="clickonfirstname">
              <p>
                <span>Name :</span> [FirstName][LastName]
              </p>
              <p>
                <span>Grade :</span> 7
              </p>
              <p>
                <span>School :</span> Veative high school, etc etc ectece.
              </p>
              <p>
                <span>Personality Animal :</span> Black Bear.
              </p>
              <p>
                <span>Last Log in :</span> hh:mm dd/mm/yyyyy
              </p>
              <p>
                <span>Primary PRofile(s) :</span> [Primary Firstname][Primary
                Lastname]
              </p>
            </div>
            <div className="secondpart clickonfirstname ">
              <p>
                <span>Premium Package :</span> Pursuit, pathway
              </p>
              <p>
                <span>Passport :</span> started
              </p>
              <p>
                <span>Tasks (complete / total) :</span> 12 / 21 
              </p>
              <p>
                <span>Action Plan :</span> AP1 | AP2 | AP3
              </p>
              <p>
                <span>Career Acceletor Plan :</span> Draft
              </p>
            </div>
          </div>

          <div className="main-div">
            <Button className="mrbutton button-title">
              View self-discovery report <br />
              (opens in new tab)
            </Button>
            <Button className=" mrbutton button-title">View Passport</Button>
            <Button className="mrbutton button-title">View Tasks</Button>
            <Button className="button-title">Open C.A.P</Button>
          </div>
          <h3>Sessions</h3>
          <Card className="cardforfirstname">
          <div className="upcomingSessionBorder"><div className="upcomingSessionInnerBox">Thursday January 13, 2022</div></div>
          <div className="upcomingSessionListing"><div className="aboveUlDiv">
            <ul>
              <li>8:30 PM - 9:30 PM</li>
              <li>TestTwentyTwo Shukla</li>
              <li>PREMIUM PATHWAY</li>
              <li>Discovery and Exploration</li>
              <li>English - US </li>
              <li><span id="firstSpanClick" className="arrowDiv">Details {dropOn ? (<KeyboardArrowUp />) : (<KeyboardArrowDown />)} </span></li>
            </ul>

            <ol id="0" className="notexTextUl">
              <li>
                <Button variant="contained" className="watch-button">
                  <Videocam /> Watch
                </Button><br />
                <Button variant="contained" className="watch-button">
                  <TextSnippet /> Action Plan
                </Button><br />
                <Button variant="contained" className="watch-button">
                  <CancelPresentation /> Cancel Session
                </Button><br />
                <Button variant="contained" className="watch-button icon">
                  <Videocam /> Rescheduale Session
                </Button>
              </li>
              <li className="notesTextLi">this is test booking</li>
            </ol>
          </div>
          </div>
          </Card>
        </Grid>
      ) : (
        ""
      )}
    </div>
  );
};
export default AppicationScreen;
