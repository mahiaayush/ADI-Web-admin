import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    TextField,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    Box
  } from "@material-ui/core";
  import * as React from "react";
  import "../CounselloApplication/DetailScreen.css";
  import { useEffect, useState } from "react";
  import type { ChangeEvent } from 'react';
  import http from "../../utils/http";
  // import { useDispatch } from "react-redux";
  import { useParams } from "react-router-dom";
  // import { useSelector } from "src/store";
  import { useDispatch, useSelector } from "../../store";
  import Select from "react-select";
  import { makeStyles } from "@material-ui/core/styles";
  import getAllEntity from "src/store/actions/GetAllEntityAction";
  import { postEntityMapItem } from "src/store/actions/entityMapItemAction";
  import { postEntityPackageAction } from "src/store/actions/AssignedEntityPackageAction";
  import GetEntityMasterPlanAction from "src/store/actions/EntitiesMasterPlanAction";
  import { getEntityItemDetail } from "src/store/actions/GetEntityItemDetailAction";
  // import DatePicker from "react-datepicker";;
import { indexOf } from "lodash";
import { Block } from "@material-ui/icons";
import { DateRangePicker, DateRange, DatePicker } from "@material-ui/lab";
import {
  ADMIN_API_ENDPOINT_V2, POST_ENTITY_PACKAGE
} from '../../store/constants';
import moment from "moment";

  export default function ItemMap({
    itemId,
    openPopupItemMap,
    setOpenPopupItemMap,
    SchoolName,
  }) {
    const { id } = useParams();
    const [data, setData] = useState('');
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    // const [entityID, setEntityID] = useState();
    const [plan, setPlan] = useState('');
    const [seat, setSeatNo] = useState(0);
    const [tranid, setTranId] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSucessMessage] = useState("");
    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
    const today = new Date();
    const currDate = new Date(today.setDate(today.getDate()));
    currDate.setHours(0);
    currDate.setMinutes(0);
    currDate.setSeconds(0);
     let minEndDate;
    if (startDate) {
      minEndDate = moment(startDate).add(30, 'day')
    }
    const useStyles = makeStyles({
      parentDiv: {
          display: "block",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
        margin: "30px"
      },
      pricing: {
        fontWeight: 600,
        fontSize: "20px",
      },
      spinnerClass: {
        marginTop: "100px",
        marginLeft: "50px",
        minHeight: "20vh",
        minWidth: "500px",
      },
      errorClass: {
        color: "red",
        fontWeight: 400,
        marginRight: "10px",
        textTransform: "capitalize"
      },
      errorOuterDiv: {
        maxWidth: "475px",
      }
    });

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (search.trim().length > 0) {
          dispatch(getAllEntity(search));
        }
      }, 2000)
      return () => clearTimeout(delayDebounceFn)
    }, [search]);

    const classes = useStyles();

    const allEntityList = useSelector(
        (state) => state?.getAllEntity?.getAllEntityResponse?.data
    );

let newArr = [];
    if (allEntityList.length > 0) {
       newArr = allEntityList?.map((item) => ({
        label: item.EntityName,
        value: item.EntityId,
      }));
    }
    
    const dummyarr = [{ label: 'name1', value: 'value1' }]
    
    const handleClose = () => {
      setOpenPopupItemMap(false);
      setData('');
      setPlan('')
      setSeatNo(0)
      setTranId('')
      setStartDate(null)
      setEndDate(null)
      setError('')
      setSucessMessage('')
    }
   
    const SubmitHandler = async () => {
      setError('')
      setSucessMessage('')
      const sdate = moment(startDate).format('YYYY-MM-DD');
      const edate = moment(endDate).format('YYYY-MM-DD');
      const url = window.location.href;
      const entityId = url.substring(url.lastIndexOf('/') + 1);
     const postEntityPackageData = {
       "EntityId": entityId,
       "ZohoPlanId": plan,
       "NumUsers": seat,
       "TransactionId": tranid,
       "StartDate": sdate,
       "EndDate": edate, 
     };
      
       if (plan && seat && startDate && endDate) { 
        try {
          const res = await http.post(
            `${ADMIN_API_ENDPOINT_V2}${POST_ENTITY_PACKAGE}`, postEntityPackageData,
          );
          console.log("resresres", res)
          if (res.data.status === true) {
            setSucessMessage(res?.data?.data);
            dispatch(getEntityItemDetail(entityId))
            setTimeout(() => {
              handleClose()
            }, 1000);
          } 
        } catch (error) {
          console.log('error', error.response.data.message);
          setError(error?.response?.data?.message)
        }
    } else {
        setError("something went wrong...")
      }
    };

    useEffect(() => {
      setSearch('');
    }, [openPopupItemMap])

    useEffect(() => {
      const url = window.location.href;
      const entityId = url.substring(url.lastIndexOf('/') + 1);
      dispatch(GetEntityMasterPlanAction(entityId));
    }, [])
    const entityMasterPlan = useSelector(
      state => state?.EntityMasterPlan?.getEntityMasterPlanResponse?.data?.data
  );
  
    const handleYes = () => {
        SubmitHandler();
    };
    const handleRadio = (e) => {
      setPlan(e.target.value)  
    }
    const handleDateSelect = (val) => {
      setValue(val);
      if (val[0] !== null && val[1] !== null) {
        setStartDate(moment(val[0]).format("YYYY-MM-DD"));
        setEndDate(moment(val[1]).format("YYYY-MM-DD"));
      }
    };
    return (
      <>
        <Dialog
          open={openPopupItemMap}
          className="aprovelPop1"
          onClose={handleClose}
        >
          <DialogTitle>Add License to {SchoolName}</DialogTitle>
          <FormControl>
              <RadioGroup 
                className="parent-Divs"
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                style={{ flexDirection: 'initial' }}
              >
          {entityMasterPlan && entityMasterPlan.map((item, index) => (
                <FormControlLabel value={item.ZohoPlanId} control={<Radio />} label={item.PlanName} onChange={handleRadio} />
            ))}
            </RadioGroup>
              </FormControl>
          <TextField
            margin="dense"
            size="small"
            label="Number of Seats"
            name="Seats"
            type="number"
            fullWidth
            inputProps={{ inputProps: { min: 0, max: 10, pattern: "^[0-9]*$" } }}
            value={seat !== 0 ? seat : ''}
            onChange={(e: ChangeEvent<any>) => { setSeatNo(e.target.value); setError(e.target.value <= 0 || e.target.value > 100000 ? 'Enter correct Number Of Seats , Seat Limit : 100000' : '') }}
            required
          />  
          <TextField
          //  className={classes.chileTextField}
            margin="dense"
            size="small"
            fullWidth
            type="text"
            label="Transaction ID"
            name="Transaction ID"
            inputProps={{ maxLength: 36 }}
            onChange={(e: ChangeEvent<any>) => setTranId(e.target.value)}
            value={tranid}
          />
          <div style={{ display: 'flex', justifyContent: "center" }}>
          <DatePicker onChange={(date) => setStartDate(date)} value={startDate} minDate={currDate} renderInput={(params) => <TextField {...params} helperText="Start Date" />} />
          <DatePicker onChange={(date) => setEndDate(date)} value={endDate} disabled={!startDate} minDate={minEndDate} renderInput={(params) => <TextField {...params} helperText="End Date" />} />
          </div>
             
          <DialogActions style={{ bottom: 10, right: 10 }}>
          <div className={classes.errorOuterDiv}><h5 className={classes.errorClass}>{error}</h5>
          <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5></div>
            <Button color="primary" variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={!(plan && seat && startDate && endDate)}
              onClick={handleYes}
              variant="contained"
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }