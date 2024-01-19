import * as React from "react";
import {
    Dialog,
    DialogContent,
    Grid,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    TextareaAutosize
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "src/store";
import toast from "react-hot-toast";
import { getStudyRoute, saveStudyRoute, updateStudyRoute } from "src/store/actions/RMOStudyRouteAction";
import { getRMORegcarCodeList } from "src/store/actions/RMOProgressionAction";

const initialStudyRoute = {
    RegcarCode: "",
    SrOrder: 0
}
const studyRouteValidator = {
    validator: {
        SrregcarId: (value = "") => !!value.trim(),
        RegcarCode: (value = "") => value?.trim()?.length > 1,
        SrOrder: (value = "") => /^\d+\.?\d*$/.test(value),
    },
    errorMessage: {
        SrOrder: 'Please fill valide Order number',
    }
}

export default function AddRMOStudyRoutePopup({ openImport, setOpenImport, SrregcarId = 0, pageNo = 1, limit = 10 }) {
    const dispatch = useDispatch();
    const [studyRouteData, setStudyRouteData] = useState(initialStudyRoute);
    const { validator, errorMessage } = studyRouteValidator;

    const handleChange = async (e: any) => {
        const { name: field, value, checked } = e.target
        setStudyRouteData((prevState) => ({ ...prevState, [field]: value }))
    }
    const validate = (field?: string) => {
        let isValid = true
        if (field) {
            isValid = validator[field](studyRouteData[field])
        } else {
            isValid = Object.keys(studyRouteData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
        }
        return isValid;
    }
    const fieldValidate = (field?: string) => {
        let isValid = true;
        if (field && studyRouteData[field]?.length > 0) {
            isValid = validator[field](studyRouteData[field])
        }
        return isValid;
    }
    const handleErrorMessage = (field: string) => {
        return !validate(field) ? errorMessage[field] : '';
    }

    const allStudyRouteData = useSelector(
        (state: any) => state?.getStudyRouteData?.StudyRouteResponse?.data
    )
    useEffect(() => {
        dispatch(getRMORegcarCodeList());
    }, []);
    const RMORegcarCodeListData = useSelector(
        (state: any) => state?.getRegCodeList?.RMOPRegCodeResponse?.data
    )

    useEffect(() => {
        if (SrregcarId > 0) {
            const rowData = allStudyRouteData?.rows?.find((itm) => itm?.SrregcarId === SrregcarId);
            setStudyRouteData({
                RegcarCode: rowData?.RegcarCode,
                SrOrder: rowData?.SrOrder
            })
        }
    }, [SrregcarId])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (SrregcarId > 0) {
            // Update Dispatcher
            dispatch(updateStudyRoute(SrregcarId, studyRouteData)).then((data: any) => {
                if (data?.isSuccess) {
                    toast.success(data?.message)
                    setStudyRouteData(initialStudyRoute)
                    setOpenImport(!openImport);
                    dispatch(getStudyRoute(pageNo + 1, limit));
                } else {
                    toast.error(data?.message)
                }
            })
        } else {
            // Save Dispatcher
            dispatch(saveStudyRoute(studyRouteData)).then((data: any) => {
                if (data?.isSuccess) {
                    toast.success(data?.message)
                    setStudyRouteData(initialStudyRoute)
                    setOpenImport(!openImport);
                    dispatch(getStudyRoute(pageNo + 1, limit));
                } else {
                    toast.error(data?.message)
                }
            })
        }
    }

    return (
        <div id="dsdds">
            <Dialog open={openImport} fullWidth={true} maxWidth="md">
                <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
                    <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
                    <h2 style={{ textAlign: 'center' }}>{(SrregcarId === 0) ? 'Add' : 'Edit'} Study Route </h2>
                    <DialogContent>
                        <form onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                                <Grid item md={6}>
                                    <InputLabel required id="demo-simple-select-label">Regcar Title</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="RegcarCode"
                                        name="RegcarCode"
                                        value={studyRouteData.RegcarCode}
                                        placeholder="RegcarTitle "
                                        sx={{ width: '100%' }}
                                        onChange={handleChange}
                                        size="small"
                                        error={!fieldValidate("RegcarCode")}
                                        required
                                    >
                                        {
                                            RMORegcarCodeListData?.length > 0
                                            && RMORegcarCodeListData?.map((item) => (<MenuItem value={item?.RegcarCode}>{item?.RegcarTitle}</MenuItem>))
                                        }
                                    </Select>
                                </Grid>
                                <Grid item md={6}>
                                    <InputLabel required id="demo-simple-select-label">Sr Order</InputLabel>
                                    <TextField
                                        id="outlined-basic"
                                        name="SrOrder"
                                        value={studyRouteData.SrOrder}
                                        onChange={handleChange}
                                        error={!fieldValidate("SrOrder")}
                                        helperText={handleErrorMessage("SrOrder")}
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        sx={{ width: '100%' }}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                sx={{ float: "right" }}
                                variant="contained"
                                disabled={!validate()}
                                color="primary"
                                type="submit"
                            >
                                {(SrregcarId === 0) ? 'Save' : 'Update'}
                            </Button>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
}
