import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button
} from "@material-ui/core";
import "../CounselloApplication/DetailScreen.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counsellorProfile } from "../../../config";
import { useParams } from "react-router-dom";
import axios from "@aws-amplify/storage/node_modules/axios";
import http from "src/utils/http"
import { ADMIN_API_ENDPOINT, UPDATE_PLAN_NAME } from '../../store/constants'
import { getCounsellorOverview } from "../../store/actions/counsellorOverViewAction";

export default function UpdatePlanName(getCounsellorData) {
    const { CounselorProdileId, Type } = getCounsellorData;
    const { id } = useParams();
    const filter = "Weekly";
    // const plantypelist = String.prototype.toLowerCase.apply(Type).split(",");
    // const plannames = plantypelist.map(a => a.charAt(0).toUpperCase() + a.substr(1))
    // console.log('plantypelist', plannames);

    const [open, setOpen] = useState(false);
    const [checkitm, setCheckitm] = useState(false);
    const [status, setStatus] = useState(false);
    const [arr, setArr] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Type) {
            setArr(Type);
        }
    }, [Type])
    const handelChecked = (e) => {
        if (e.target.checked) {
            setArr([...arr, e.target.id]);
        } else {
            setArr(arr.filter((id) => (id !== e.target.id)))
        }
    }
    useEffect(() => {
        if (arr.length > 0) {
            setCheckitm(false)
        } else {
            setCheckitm(true)
        }
    }, [arr])
    const handleApprove = () => {
        if (!checkitm) {
            const param = {
                profileId: CounselorProdileId,
                plantype: arr,
            };
            axios
            http.post(`${ADMIN_API_ENDPOINT}${UPDATE_PLAN_NAME}`, param)
                .then((res) => {
                    setStatus(res.data.status);
                    if (res.data.status === true) {
                        setOpen(false);
                        dispatch(getCounsellorOverview(id));
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                    setStatus(false);
                });
        }
    }
    const handleClose = () => {
        setOpen(false);
        setArr(Type);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div style={{ marginLeft: "auto" }}>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                className="buttonClassOverview"
            >
                Update plans
            </Button>
            <Dialog open={open} className="aprovelPop" onClose={handleClose}>
                <DialogTitle>Update Plans Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <table>
                            <tr><td><h4>Please select plans *</h4></td></tr>
                        </table>
                        <table>
                            <tr>
                                {counsellorProfile.map((item) => (
                                    <td className="checkboxlist" key={item.label.toString()}>
                                        <input key={item.label} id={`${item.label}`} className="checkboxitem" type="checkbox" checked={arr.includes(item.label)} onChange={handelChecked} /> {item.label}
                                    </td>
                                ))}
                            </tr>
                        </table>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleApprove} disabled={checkitm} variant="contained" autoFocus>
                        Approve
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}