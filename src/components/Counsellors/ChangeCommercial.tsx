import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Checkbox,
  CircularProgress,
  Table
} from "@material-ui/core";
import { useEffect, useState } from "react";
import http from "../../utils/http";
import { useParams } from "react-router-dom";
import { getCounsellorOverview } from "../../store/actions/counsellorOverViewAction";
import { makeStyles } from "@material-ui/core/styles";
import ActiveEntitiesAction from "src/store/actions/ActiveEntitiesAction";
import { useDispatch, useSelector } from "react-redux";
import {
  ADMIN_API_ENDPOINT_V2,
  POST_COUNSELLOR_PRICE,
} from "src/store/constants";

const useStyles = makeStyles({
  parentDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    margin: "auto",
    fontSize: "15px",
    color: "red",
    textTransform: "capitalize"
  }
});

export default function ChangeCommercial({
  openPopup,
  setOpenPopup,
  ApplicationId,
}) {
  const [activeEntity, setActiveEntity] = useState([]);
  const [unAssigned, setUnAssigned] = useState([]);
  const [assignedCom, setAssignedCom] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const filter = "Weekly";

  const activeItemEntities = useSelector(
    (state:any) => state?.activeEntityReducer?.activeEntityListResponse?.data
  );

  useEffect(() => {
    dispatch(ActiveEntitiesAction(ApplicationId));
  }, []);

  useEffect(() => {
    if (activeItemEntities) {
      const getData2 = JSON.parse(JSON.stringify(activeItemEntities));
      const IndexedValues = getData2.map((item, idx) => ({ ...item, index: idx }));
      setActiveEntity(IndexedValues)
      const unassignedEntities = IndexedValues.filter(item => item.Assign === false)
      setUnAssigned(unassignedEntities)
    }
  }, [activeItemEntities])

  const handleClose = () => {
    setOpenPopup(false);
  };
  const checkedKeys = (obj) => {
    const isPresent = assignedCom.some((item) => item === obj)
    if (!isPresent) {
      assignedCom.push(obj);
    } else {
      const index = assignedCom.findIndex((item) => item === obj)
      assignedCom.splice(index, 1)
    }
  }

  const checkedHandler = (item, index, e) => {
    if (e.target.checked) {
         const dataValue = [...activeEntity];
         const current = dataValue[index];
         current.Assign = true;
         dataValue[index] = current;
         setActiveEntity([...dataValue])
         checkedKeys(current)
         setError('')
    } else {
         const isAlreadyAssignedFil = activeItemEntities.filter(it => it.Assign === item.Assign).some(it1 => it1.index === index)
         const dataValue = [...activeEntity]
          const current = dataValue[index]
         if (!isAlreadyAssignedFil) {
          current.Assign = false;
          setError('')
         } else {
          current.Assign = true;
         }
         dataValue[index] = current;
         checkedKeys(current)
         setActiveEntity([...dataValue])
    }
  }

  const SubmitHandler = async () => {
    const data = assignedCom?.map((item) => ({
      ItemId: item.ITEM_ID,
      EntityPackageId: item.ENTITYPACKAGE_ID,
      PlanName: item.PLAN_NAME,
      Status: "A"
    })); 

    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${POST_COUNSELLOR_PRICE}/${ApplicationId}`,
        data
      );
      if (res.data.status === true) {
        setOpenPopup(false);
        dispatch(getCounsellorOverview(id));
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <Dialog
        open={openPopup}
        className="aprovelPop"
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        {activeEntity.length > 0 ? (
          <>
          <DialogTitle>UPGRADE COMMERCIAL</DialogTitle>
            <DialogContent style={{ minHeight: "290px" }} dividers={true}>
              <DialogContentText>
                Are you sure want to upgrade the counsellor commercial
              </DialogContentText>
              <Table className="learnerListing">
            <thead>
              <tr>
                <th style={{ width: "13%" }}>Select Item/Entities</th>
                <th>PLAN NAME</th>
                <th>ITEM NAME</th>
                <th>PRICE</th>
                <th>ENTITY</th>
              </tr>
            </thead>
            <tbody>
            {activeEntity.length > 0 && activeEntity.map((item, idx) => {
                return <tr key={idx.toString()}>
                  <Checkbox onClick={(e) => checkedHandler(item, idx, e)} checked={item.Assign} />
                    <td>{item?.PLAN_NAME}</td>
                    <td>{item?.ITEM_NAME}</td>
                    <td>{item?.PRICE}</td>
                    <td>{item?.ENTITY_NAME}</td>
                  </tr>
                  })}
            </tbody>
          </Table>
            </DialogContent>
            <DialogActions>
              {error !== '' && <h6 className={classes.errorClass}>{error}</h6>}
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={SubmitHandler} disabled={!unAssigned.some(item => item.Assign === true)}>Submit</Button>
            </DialogActions>
            </>) : (
          <div className={classes.spinnerClass}>
            <CircularProgress />
          </div>
        )}
      </Dialog>
    </>
  );
}