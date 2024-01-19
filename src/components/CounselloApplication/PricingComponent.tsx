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
import { approveAction } from "src/store/actions/DetailScreenAction";
import { DetailAction } from "src/store/actions/DetailAction";
import { makeStyles } from "@material-ui/core/styles";
import ActiveEntitiesAction from "src/store/actions/ActiveEntitiesAction";
import { useDispatch, useSelector } from "src/store";
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

export default function PricingComponent({
  openPopup,
  setOpenPopup,
  getCounsellorData,
}) {
  const [itemEntity, setItemEntity] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ActiveEntitiesAction(getCounsellorData?.APPLICATION_ID));
  }, []);
  const activeEntities = useSelector(
    (state) => state.activeEntityReducer.activeEntityListResponse.data
  );
  useEffect(() => {
    if (activeEntities) {
      const getData2 = JSON.parse(JSON.stringify(activeEntities));
      setItemEntity(getData2)
    }
  }, [activeEntities])

  const handleClose = () => {
    setOpenPopup(false);
  };

  const checkedHandler = (item, index, e) => {
    if (e.target.checked) {
        const dataValue = [...itemEntity];
         const current = dataValue[index];
         current.Assign = true;
         dataValue[index] = current;
         setItemEntity([...dataValue])
    } else {
         const dataValue = [...itemEntity]
          const current = dataValue[index]
          current.Assign = false;
         dataValue[index] = current;
         setItemEntity([...dataValue])
    }
  }

  const assignedCommercial = itemEntity.filter((item) => item.Assign === true)

  const SubmitHandler = async () => {
    const data = assignedCommercial?.map((item) => ({
      ItemId: item.ITEM_ID,
      EntityPackageId: item.ENTITYPACKAGE_ID,
      PlanName: item.PLAN_NAME
    }));

    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${POST_COUNSELLOR_PRICE}/${getCounsellorData?.APPLICATION_ID}`,
        data
      );
      if (res.data.status === true) {
        const commercialStatus = {
          Key: "COMMERCIAL_STATUS",
          Value: "INITIATED",
        };
        dispatch(
          approveAction(getCounsellorData?.APPLICATION_ID, commercialStatus)
        );
        setOpenPopup(false);
        dispatch(DetailAction(id));  
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
        {activeEntities.length > 0 ? (
          <>
          <DialogTitle>COMMERCIAL</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please select the commercial for counsellor
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
            {activeEntities.length > 0 && activeEntities.map((item, idx) => {
                return <tr key={idx.toString()}>
                  <Checkbox onClick={(e) => checkedHandler(item, idx, e)} />
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
              <Button onClick={SubmitHandler} disabled={!itemEntity.some(item => item.Assign === true)}>Submit</Button>
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
