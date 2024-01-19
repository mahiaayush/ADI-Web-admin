import * as React from "react";
import { Button, FormControlLabel, Radio, Checkbox } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Close } from "@material-ui/icons";
import "../../assets/css/ActionPlan.css";
import { useDispatch, useSelector } from "react-redux";
import getActionPlan from "src/store/actions/getActionPlanAction";
import moment from "moment";
import { getLocalTime } from "src/utils/utility";

export default function ActionPlan(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    props.setOpen(false);
  };

  React.useEffect(() => {
    dispatch(getActionPlan(props.scheduleId));
  }, []);

  const ActionPlanData = useSelector((state: any) =>
    (state.actionPlan.actionPlanResponse.success
      ? state.actionPlan.actionPlanResponse.data
      : false));

  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={handleClose}>
        {ActionPlanData ? (
          <>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <Typography
                  sx={{ ml: 0, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  {ActionPlanData.LearnerName} Action Plan
                </Typography>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  style={{ paddingRight: "0px" }}
                >
                  <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Container maxWidth="xl">
              <div className="headwrap">
                <div className="detail">
                  {/* <FaCompass className="ap-icon" /> */}
                  <h4 className="font-weight-bold mt-0 mb-0">{ActionPlanData.Plan}</h4>
                </div>
                <div className="session-count">
                  Session: <span className="font-weight-bold">{ActionPlanData.AgendaOrder} of {ActionPlanData.TotalSession}</span>
                </div>
              </div>
              <div className="headwrap">
                <div className="detail">
                  {/* <FaCompass className="ap-icon" /> */}
                  <span className="font-weight-bold">Status: {ActionPlanData.ActionPlanStatus === "P" ? "Published" : "Unpublished" }</span>
                </div>
              </div>
              <div className="headwrap pt-0">
                <div className="detail">
                  {/* <FaCompass className="ap-icon" /> */}
                  <span className="font-weight-bold">Last Updated: {getLocalTime(ActionPlanData.LastUpdated)[3]}</span>
                </div>
              </div>
              <Divider />
              <div className="box">
                <div className="box-header">
                  <h3>{ActionPlanData.Agenda}</h3>
                  <h3>{ActionPlanData.SubAgenda}</h3>
                </div>
                <div className="content-box">
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Session Status</h4>
                    <FormControlLabel
                      value="Attended"
                      control={<Radio checked={ActionPlanData.SessionStatus === "AT"} disabled />}
                      label="Attended"
                    />
                    <FormControlLabel
                      value="Unattended"
                      control={<Radio checked={ActionPlanData.SessionStatus === "UA"} disabled />}
                      label="Unattended"
                    />
                  </div>
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Meeting Status</h4>
                    <FormControlLabel
                      value="Attended"
                      control={<Radio checked={ActionPlanData.MeetingStatus === "C"} disabled />}
                      label="Completed"
                    />
                    <FormControlLabel
                      value="Unattended"
                      control={<Radio checked={ActionPlanData.MeetingStatus === "NC"} disabled />}
                      label="Not Completed"
                    />
                    {/* <FormControlLabel
                      value="Unattended"
                      control={<Radio checked={ActionPlanData.MeetingStatus === "NS"} disabled />}
                      label="No Show"
                    /> */}
                  </div>
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Overview</h4>
                    <p>
                      {ActionPlanData.Overview}
                    </p>
                  </div>
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Intervention</h4>
                    <p>
                    {ActionPlanData.Intervention}
                    </p>
                  </div>
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Insights</h4>
                    <p>
                    {ActionPlanData.Insights}
                    </p>
                  </div>
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Tasks</h4>
                    
                      {ActionPlanData?.Tasks?.length > 0 
                      ? ActionPlanData?.Tasks?.map((item) => (<div className="taskRow">
                          <p>{item.Task}<br />
                          <span className="small-text">{moment(new Date(item.CreateDate).toLocaleString()).startOf('minute').fromNow()}</span>
                          </p>
                          <Checkbox disabled checked={item.Status === "C"} />
                        </div>))
                        : <p>No Task Available.</p>}
                  </div>
                </div>
              </div>
            </Container>
          </>
        ) : (
          <>Loading....</>
        )}
      </Dialog>
    </div>
  );
}
