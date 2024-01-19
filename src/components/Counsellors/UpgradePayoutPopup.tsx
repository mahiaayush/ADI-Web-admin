import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    NativeSelect,
  } from "@material-ui/core";
  import "../CounselloApplication/DetailScreen.css";
  import { useEffect, useState } from "react";
  import PayrollListAction from '../../store/actions/PayrollListAction'
  import http from "../../utils/http";
  import { useDispatch, useSelector } from "react-redux";
  import { useParams } from "react-router-dom";
  import { getCounsellorOverview } from "../../store/actions/counsellorOverViewAction";
  import {
    ADMIN_API_ENDPOINT_V2, POST_UPGRADE_PAYROLL
  } from '../../store/constants';
  
  export default function UpgradePayoutPopup({
    openPopupReject,
    setOpenPopupReject,
    payrollId,
    ApplicationId,
  }) {
    const { id } = useParams();
    const [rejectText, setRejectText] = useState(''); 
    const [data, setData] = useState('');
    const [payrollType, setPayrollType] = useState(payrollId);
    const dispatch = useDispatch();
    const filter = "Weekly";

    useEffect(() => {
        dispatch(PayrollListAction())
    }, [])

    const SubmitHandler = async () => {
      try {
        const res = await http.post(
          `${ADMIN_API_ENDPOINT_V2}${POST_UPGRADE_PAYROLL}`,
          {
            "PayrollId": payrollType,
            "ApplicationId": ApplicationId,
            "Remarks": rejectText,
        },
        );
        if (res.data.status) {
          dispatch(getCounsellorOverview(id));
          setRejectText('');
          setPayrollType(payrollId);
          setOpenPopupReject(false);
        } 
      } catch (error) {
        console.log('error', error);
      }
    };
    
    const payrollList = useSelector((state:any) => state.payrollList.payrollListResponse.data);  
    const handleClose = () => {
      setOpenPopupReject(false);
      setRejectText('');
      setPayrollType(payrollId);
    }

    const handleApprove = () => {
       SubmitHandler();
    }

    return (
      <>
        <Dialog open={openPopupReject} className="aprovelPop" onClose={handleClose}>
          <DialogTitle>
            {" "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText color="dimgrey">
              <DialogContentText>
              Are you sure you want to change the counsellor payout type ?
              </DialogContentText>
            </DialogContentText>
            <DialogContentText color="dimgrey">
            <div>
                <p style={{ "fontWeight": "bold", "textAlign": "left", "marginBottom": "0px" }}>Select Payout Type</p>
                <NativeSelect
                  id="demo-simple-select"
                  style={{ width: "100%" }}
                  value={payrollType}
                  onChange={(e) => setPayrollType(e.target.value)}
                >
                  {
                    payrollList?.length > 0 && payrollList.map((item, index) => (
                    <option key={index.toString()} value={item.PayrollId}>{item.PayrollName}</option>
                    ))
                  }
                </NativeSelect>
              </div>
            </DialogContentText>
            <DialogContentText>
              Reason to change the counsellor payout type
            </DialogContentText>
            <textarea
            className="text"
            name="textarea"
            value={rejectText}
            onChange={(e) => setRejectText(e.target.value)} 
            />
          </DialogContent>
  
          <DialogActions>
            <Button onClick={handleClose}>No, don&apos;t Approve</Button>
            <Button variant="contained" autoFocus onClick={handleApprove} className={rejectText.trim().length === 0 ? "disableBtnYes" : ""}>
              Approve
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }