import { useMemo, useState, useEffect } from 'react';
import {
    Tab,
    Tabs,
    Container,
    Grid,
    Typography,
    Link,
    Breadcrumbs,
    Tooltip,
    IconButton,
    Box,
    Card,
    Button,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from '../../store';
import _ from "lodash";
import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT,
    SAVE_META_URL,
    SAVE_META_SUCCESS,
    SAVE_META_ERROR,
    GET_META_URL,
    GET_META_SUCCESS,
    GET_META_ERROR,
} from "src/store/constants";

const useStyles = makeStyles({
    topheader: {
        paddingTop: "16px",
        position: "relative",
    },
    tablebackground: {
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: "4px",
        position: "relative",
        boxShdow: "0px 1px 2px #ddd",
        marginTop: "24px",
    },
    tableTab: {
        width: "100%",
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
    },
    tabbing: {
        borderBottom: "2px solid #fff",
    },
    active: {
        borderBottom: "2px solid #5664d2",
        color: "#5664d2",
    },
    usertooltip: {
        position: "absolute",
        right: "0px",
        top: "16px",
    },
    messageSave: {
        marginLeft: "13px",
        color: "green",
    },
    errorMessage: {
        marginLeft: "443px",
        color: "#ff0033",
        paddingBottom: "6px",
    }
});
const SeoTagList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [type, setType] = useState(null);
    const [uniqueId, setUniqueId] = useState(null);
    const [btndisabled, setBtndisabled] = useState(true);
    const [typeError, setTypeError] = useState(true);
    const [displayForm, setDisplayForm] = useState(false);
    const [validUniqueId, setValidUniqueId] = useState(false);
  
    const intitialFormObj = {
        title: null,
        description: null,
        keywords: null,
        ogDescription: null,
        ogTitle: null,
        ogUrl: null,
        robots: null,
        ogImage: null,
        twitterCard: null,
        twitterDescription: null,
        twitterImage: null,
        twitterTitle: null,
        twitterUrl: null,
    }
    const [formData, setFormData] = useState(intitialFormObj)
    let savebutton
    const handleDropdown = (event) => {
        setType(event.target.value);
        setTypeError(false)
        setUniqueId("");
    };
    const onInputFieldChange = (e) => {
        setUniqueId(e.target.value)
        if (e.target.value.length < 1) {
            setBtndisabled(true)
        }
        if (typeError !== true && e.target.value.length >= 1) {
            setBtndisabled(false)
        }
    }
    const [error, setError] = useState('');
    const [successMessage, setSucessMessage] = useState("");
    const handleSubmit = () => {
        setError('')
        setSucessMessage('')
        return http.get(`${ADMIN_API_ENDPOINT}${GET_META_URL}?type=${type}&uniqueId=${uniqueId}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_META_SUCCESS,
                    payload: res.data.data,
                });
                setDisplayForm(true)
                setValidUniqueId(false)
            } else {
                dispatch({
                    type: GET_META_ERROR,
                    payload: res.data,
                });
                setDisplayForm(false)
                setValidUniqueId(true)
            }
        }).catch(err => {
            console.log('errinffetchmeta', err.response)
            dispatch({
                type: GET_META_ERROR,
                payload: err?.response?.data,
            });
            setDisplayForm(false)
            setValidUniqueId(true)
        })
    }
   
    const handleFormSubmit = async () => {
        setError('')
        setSucessMessage('')
        const text = formData.keywords?.toString();
        const keywordArr = text.split(",");

        const dataValue = {
            type,
            uniqueId,
            title: formData.title?.trim(),
            description: formData.description.trim(),
            keywords: keywordArr,
            ogDescription: formData.ogDescription.trim(),
            ogTitle: formData.ogTitle.trim(),
            ogUrl: formData.ogUrl.trim(),
            robots: formData.robots.trim(),
            ogImage: formData.ogImage.trim(),
            twitterCard: formData.twitterCard.trim(),
            twitterDescription: formData.twitterDescription.trim(),
            twitterImage: formData.twitterImage.trim(),
            twitterTitle: formData.twitterTitle.trim(),
            twitterUrl: formData.twitterUrl.trim(),
        }
        let res;
        try {
            const param = {
                ...dataValue
            };
    
             res = await http.post(
                `${ADMIN_API_ENDPOINT}${SAVE_META_URL}`,
                param
            );
            console.log("ressponse", res?.data?.message)
    
            if (res.data.status === true) {
                setSucessMessage(res?.data?.message);
                dispatch({
                    type: SAVE_META_SUCCESS,
                    payload: res.data.data,
                });
            } else {
                dispatch({
                    type: SAVE_META_ERROR,
                    payload: res.data,
                });
            }
        } catch (error) {
             setError(error?.response?.data?.message)
             console.log("ressponse", error?.response?.data?.message)
             console.log("error", error);
        }
    }

    const formChangeHandler = (e, i, item) => {
        savebutton = false
        const dataValue = { ...formData }
        dataValue[item] = e.target.value
        setFormData(dataValue);
    }
    const { getMeta } = useSelector((state: any) => state);
    const metaData = getMeta?.getMeta?.data;

    useEffect(() => {
        const dataValue = { ...formData }
        dataValue.title = metaData.title
        dataValue.description = metaData.description
        dataValue.keywords = metaData.keywords === "" ? [] : metaData.keywords
        dataValue.ogDescription = metaData.ogDescription
        dataValue.ogTitle = metaData.ogTitle
        dataValue.ogUrl = metaData.ogUrl
        dataValue.robots = metaData.robots
        dataValue.ogImage = metaData.ogImage
        dataValue.twitterCard = metaData.twitterCard
        dataValue.twitterDescription = metaData.twitterDescription
        dataValue.twitterImage = metaData.twitterImage
        dataValue.twitterTitle = metaData.twitterTitle
        dataValue.twitterUrl = metaData.twitterUrl
        setFormData(dataValue);
    }, [metaData])

    const validation = () => {
        if ((type && uniqueId) && !(_.isEqual(metaData, formData)) && (formData?.title?.length !== 0 || formData?.description?.length !== 0 || (formData?.keywords?.length >= 1 && formData?.keywords[0].trim() !== "") || formData?.ogDescription?.length !== 0 || formData?.ogTitle?.length !== 0 || formData?.ogUrl?.length !== 0 || formData?.robots?.length !== 0 || formData?.ogImage?.length !== 0 || formData?.twitterCard?.length !== 0 || formData?.twitterDescription?.length !== 0 || formData?.twitterImage?.length !== 0 || formData?.twitterTitle?.length !== 0 || formData?.twitterUrl?.length !== 0)) { return false; }
        return true;
    }

    return (
        <div>
            <Container>
                <Grid item xs={12} position="relative" className={classes.topheader}>
                    <Typography
                        color="textPrimary"
                        variant="h5"
                    >
                        SEO TAGs
                    </Typography>
                </Grid>
                <div>
                    <Box sx={{ minWidth: 120 }} className="whitebox">
                        <FormControl sx={{ minWidth: 380 }} style={{ margin: 20 }}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                className="setHight"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Type"
                                onChange={handleDropdown}
                            >
                                <MenuItem value="career">Career</MenuItem>
                                <MenuItem value="course">Course</MenuItem>
                                <MenuItem value="college">College</MenuItem>
                                <MenuItem value="country">Country</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField className="setHight" id="outlined-basic" required label="Unique ID" sx={{ minWidth: 380 }} variant="outlined" value={uniqueId} onChange={(e) => onInputFieldChange(e)} style={{ margin: 20 }} />
                        <Button className="btnHight padding30" disabled={btndisabled} variant="contained" style={{ margin: 22 }} onClick={handleSubmit}>Submit</Button>
                        {validUniqueId && <div className={classes.errorMessage}>Please fill valid Unique ID</div>}
                    </Box>
                    {displayForm && formData && Object.keys(formData).length !== 0 && <Card className="m20">
                        <Box
                            sx={{
                                width: 1000,
                                maxWidth: '100%',
                            }}
                        >
                            {Object.keys(formData).map((item, i) => {
                                return (
                                  <>
                                    <Typography
                                      color="textPrimary"
                                      variant="subtitle2"
                                      style={{ marginLeft: 15 }}
                                    >
                                      {item}
                                    </Typography>
                                    <input
                                      className="formInput"
                                      placeholder={item}
                                      id={item}
                                      style={{ margin: 10 }}
                                      value={formData[item]}
                                      onChange={(e) => formChangeHandler(e, i, item)}
                                    />
                                  </>
                                );
                            })}
                            <h5 style={{ color: "red", marginLeft: "20px" }}>{error}</h5>
                            <h5 style={{ color: "green", marginLeft: "20px" }}>
                                 {successMessage}
                           </h5>
                            <Button className="btnHight margin10 padding30" variant="contained" disabled={validation()} onClick={handleFormSubmit}>Submit</Button>
                        </Box>
                    </Card>}
                </div>
            </Container>
        </div>
    );
};
export default SeoTagList;