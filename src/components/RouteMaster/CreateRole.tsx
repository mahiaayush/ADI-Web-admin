import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Button,
  TextField,
  Table,
  Checkbox,
  Box,
  Card,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Select,
  OutlinedInput,
  ListItemText
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "src/store";
import { CREATE_ROLE, ADMIN_API_ENDPOINT_V2, PATCH_EDIT_EXISTING_ROUTES, PATCH_EDIT_ROLE_APIS } from "../../store/constants";
import http from "src/utils/http";
import { ArrowBackIos, AddLinkSharp } from "@material-ui/icons";
import InternalUserRoleAction from "src/store/actions/InternalUserRolesAction";
import { getAllowedApisAction, getAllPossibleApisAction, getAllPossibleRoutes, getParticularRoutesAction, getRBACAllowedApisAction } from "src/store/actions/getAllowedRoutesAction";
import RolePolicy from "./RolePolicy";
import { boolean } from "yup";

const useStyles = makeStyles({
  topheader: {
    padding: "0px"
  },
  tableWidth: {
    width: "100%",
    margin: "0px auto 10px 0px",
    borderRadius: "8px",
  },
  leftAlignClass: {
    textAlign: "left",
  },
  displayFlex: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "10px",
  },
  textFieldClass: {
    margin: "auto",
    width: "250px",
  },
  displayFlexTxt: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "auto",
  },
  backArrow: {
    marginTop: "8px",
    cursor: "pointer",
  },
  circularProgressLoadingClass: {
    "min-height": "80vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
  },
  dropdownClass: {
    "width": "300px",
  }
});
type ApiOption = {
  id: number,
  routeId: number,
  apiEndpoint: string,
  apiKey: string,
  method: string,
  [key: string]: any
};
// type typeof [ApiOption[]]
// let options:ApiOption[] = [];

const chipColor: "default" | "primary" | "secondary" = "primary";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateRole = ({ setShowCreateRole, editRole, roleId, roleObj }) => {
  const [openRolePolicy, setOpenRolePolicy] = useState(false);
  const [isPloicyChange, setIsPloicyChange] = useState(false);
  const [selectedApi, setSelectedApi] = useState([]); // for Global Apis Access
  const [routeApis, setRouteApis] = useState([]); // for Route Maped Apis Access
  const [muiSelectedApi, setMuiSelectedApi] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [routeId, setRouteId] = useState([]);
  const [routeName, setRouteName] = useState(roleObj?.RoleName);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [anchorEl, setAnchorEl] = useState<[null | HTMLElement]>();
  let open: boolean [];
  //   const open = Boolean(anchorEl);
  
    // if (value[value.length - 1] === "all") {
    //   // setMuiSelectedApi(muiSelectedApi.length === options.length ? [] : options);
    //   return;
    // }
     
  const handleClick = (event: React.MouseEvent<HTMLElement>, routeID: number) => {
    anchorEl[routeID] = event.currentTarget;
    setAnchorEl(anchorEl);
  };
  const handleClose = (routeID: number) => {
    setAnchorEl(anchorEl[routeID] = null);
  };

  // !TODO: Not able to detect changes of now Allocated of Apis
  useEffect(() => {
    setIsPloicyChange(true)
  }, [selectedApi])

  useEffect(() => {
    setLoading(true);
    dispatch(getAllPossibleApisAction())
    dispatch(getAllowedApisAction(roleId))
    dispatch(getAllPossibleRoutes()).then(() => setLoading(false))
  }, [])

  const PossibleRoutes = useSelector(
    (state: any) => state?.allPossibleRoutes?.getAllPossibleRotes?.data
  )
  
  const AssignedRoutes = useSelector(
    (state: any) => state?.getParticularRoutes?.getParticularRoutes?.data
  )
  
  const possibleApis = useSelector(
    (state: any) => state?.allPossibleApis?.getAllPossibleApis?.data
  )
  // console.log("possibleApis", possibleApis)
  // console.log("possibleApis:3", possibleApis.filter(i => i.routeId === 3))
  // console.log("possibleApis:52", possibleApis.filter(i => i.routeId === 52))
  // let SelectedChanges = [];
  const handleChangeMulti = (event, routeId) => {
    const { value } = event.target;
    // const dat = value.map(itm => {
    //   const apiId = (typeof itm === 'number') ? itm : itm.id; 
    //   return possibleApis.find(obj => obj.id === apiId)
    // })
    // SelectedChanges[routeId] = value;
    setMuiSelectedApi(value);
  };
  const AssignedRoleApis = useSelector(
    (state: any) => state?.allowedApisByRoleRes?.allowedApisByRoleRes?.data
  )
  
  // console.log("AssignedRoleApis", AssignedRoleApis)
  useEffect(() => {
    if (AssignedRoleApis.length > 0) {
      // Which is Not associated with the route
      // console.log("AssignedRoleApis ==> IF", AssignedRoleApis)
      setSelectedApi(AssignedRoleApis.filter(itm => itm.routeId === 0 || itm.routeId === null))
      // Which is Not associated with the route
      console.log("AssignedRoleApis saved", AssignedRoleApis.filter(itm => itm.routeId > 0 && itm.routeId !== null))
      setMuiSelectedApi(AssignedRoleApis.filter(itm => itm.routeId > 0 && itm.routeId !== null).map(ii => ii.id));
    } else {
      // console.log("AssignedRoleApis ==> Else", AssignedRoleApis)
    }
  }, [AssignedRoleApis]);

  useEffect(() => {
    if (PossibleRoutes?.length) {
      const getRoutes = JSON.parse(JSON.stringify(PossibleRoutes));
      setRoutes(getRoutes);
    }
  }, [PossibleRoutes]);

  useEffect(() => {
    if (editRole) {
      setLoading(true);
      dispatch(getParticularRoutesAction(roleId)).then(() => setLoading(false)) 
      // setRouteId([...AssignedRoutes])
    }
  }, [])

  useEffect(() => {
    setRouteId(AssignedRoutes)
  }, [AssignedRoutes])

  useEffect(() => {
     setRouteId([])
  }, [])

  function getAllChildrenIncludingCurrentRouteId(route) {
    const children = { ...route.children };
    const n = route.children.length;
    const id = route.ROUTE_ID;
    let enableRouteIds = [id];
    for (let i = 0; i < n; i++) {
      enableRouteIds = [
        ...enableRouteIds,
        ...getAllChildrenIncludingCurrentRouteId(route.children[i]),
      ];
    }
    return enableRouteIds;
  }

  function enableAllParents(id, route, result = []) {
    const n = route.children.length;
    if (id === route.ROUTE_ID) {
      return result;
    }
    if (!route.children.length) {
      return [];
    }
    for (let i = 0; i < n; i++) {
      const parentsArray = enableAllParents(id, route.children[i], [
        ...result,
        route.ROUTE_ID,
      ]);
      if (parentsArray.length) {
        return parentsArray;
      }
    }
    return result;
  }

  // Returns list of all enabled parents
  function enableAllParentsHelper(id, routes) {
    let result = [];
    const n = routes.length;
    for (let i = 0; i < n; i++) {
      const parents = enableAllParents(id, routes[i]);
      if (parents.length) {
        result = parents;
        break;
      }
    }
    return result;
  }

  function findParent(id, route) {
    const n = route.children.length;
    for (let i = 0; i < n; i++) {
      if (parseInt(id, 10) === parseInt(route.children[i].ROUTE_ID, 10)) {
        return route;
      }
      const parentRoute = findParent(id, route.children[i]);
      if (parentRoute) {
        return parentRoute;
      }
    }
    return null;
  }

  function findParentHelper(id, routes) {
    const n = routes.length;
    for (let i = 0; i < n; i++) {
      const parentRoute = findParent(id, routes[i]);
      if (parentRoute) {
        return parentRoute;
      }
    }
    return null; // for top level routes return null
  }

  function isLastChild(id, routes, routeIds) {
    const parentRoute = findParentHelper(id, routes);
    if (parentRoute) {
      const children = parentRoute.children as any;
      const enabledChildren = children.filter((child) =>
        routeIds.includes(child.ROUTE_ID));
      return enabledChildren.length === 1;
    }
    return true;
  }

  // * Returns a list of all parents that can be disabled.
  function disableAllParents(id, routes, routeIds) {
    // * Get a list of parents of current route id(in top - bottom order)
    const parents = enableAllParentsHelper(id, routes);
    const n = parents.length;
    const result = [];
    // * Check if current route is last child of it's parent
    if (isLastChild(id, routes, routeIds)) {
      result.push(parents[n - 1]);
    }
    // * Check till the route is last child of it's parent route
    for (let i = n - 1; i > 0; i--) {
      if (isLastChild(parents[i], routes, routeIds)) {
        result.push(parents[i - 1]);
      }
    }
    return result;
  }

  const globalCheckboxApisAccessHandler = (e, item) => {
    if (e.target.checked) {
      setRouteApis([...routeApis, item]);
    } else {
      // remove Unselected item
      setRouteApis(routeApis.filter((itm) => itm.id !== item.id))
    }
  }
  const globalCheckboxHandler = (e, item) => {
    setError("");
    if (e.target.checked) {
      const allChildrenIncludludingCurrent = getAllChildrenIncludingCurrentRouteId(item);
      const allParents = enableAllParentsHelper(item.ROUTE_ID, routes);
      // id = alChildrenIncludludingCurrent.concat(allParents);
      setRouteId([
        ...allParents,
        ...allChildrenIncludludingCurrent,
        ...routeId,
      ]);
    } else {
      const allChildrenIncludludingCurrent = getAllChildrenIncludingCurrentRouteId(item);
      const allParents = disableAllParents(item.ROUTE_ID, routes, routeId);
      const disabledRouteIds = [
        ...new Set([...allParents, ...allChildrenIncludludingCurrent]),
      ];
      const updatedRouteIds = routeId.filter(
        (id) => !disabledRouteIds.includes(id)
      );
      setRouteId(updatedRouteIds);
    }
  };

  const AddCreatedRole = async () => {  
    if (routeId.length) {
      if (editRole) {
        let apiData;
        if (routeName.trim().length !== 0) {
          apiData = {
            routes: routeId,
            id: roleId,
            roleName: routeName
        }
       } else {
          apiData = {
            routes: routeId,
            id: roleId
          } 
        } 
        // update changes of API's Access Policy 
        if (roleId !== 1) {
          try {
            const updateRoleApis = {
              apiIds: [
                ...selectedApi.map(i => i.id), 
                ...muiSelectedApi
              ]
            };
            // console.log("updateRoleApis", updateRoleApis)
            // console.log("roleId", roleId)
            const res = await http.patch(`${ADMIN_API_ENDPOINT_V2}${PATCH_EDIT_ROLE_APIS}/${roleId}`, updateRoleApis);
  
            if (res.data.status === true) {
              dispatch(InternalUserRoleAction());
              setShowCreateRole(false);
            }
          } catch (error) {
            setError(error.response.data.message);
          }
        }
        // end
        try {
          const res = await http.patch(`${ADMIN_API_ENDPOINT_V2}${PATCH_EDIT_EXISTING_ROUTES}`, apiData);
          if (res.data.status === true) {
            dispatch(InternalUserRoleAction());
            setShowCreateRole(false);
          }
        } catch (error) {
          setError(error.response.data.message);
        }
    } else {
      try {
        const res = await http.post(`${ADMIN_API_ENDPOINT_V2}${CREATE_ROLE}`, {
          routes: routeId,
          roleName: routeName,
        });
        if (res.data.status === true) {
          dispatch(InternalUserRoleAction());
          setShowCreateRole(false);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    }
    } else {
      setError("Please select atleast one route-id")
    }
  };

  return (
      <Container className={`userIndex ${classes.topheader}`}>
        <Grid item xs={12} position="relative">
        {openRolePolicy && <RolePolicy selectedApi={selectedApi} setSelectedApi={setSelectedApi} openRolePolicy={openRolePolicy} setOpenRolePolicy={setOpenRolePolicy} allApis={possibleApis.filter(itm => itm.routeId === 0 || itm.routeId === null)} />}
          <Typography color="textPrimary" variant="h5">
            Role Master
          </Typography>
        </Grid>
        {!loading ? <Box sx={{ mt: 3 }}>
          <Card>
            <Grid className="counsellorApplicationListTable filterdataContner">
              <div style={{ padding: "10px 10px 10px 10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ArrowBackIos
                    className={classes.backArrow}
                    onClick={() => setShowCreateRole(false)}
                  />
                  <h2>Roles</h2>
                  <div className={classes.displayFlexTxt}>
                    {error !== "" && (
                      <h3
                        style={{
                          color: "red",
                          marginRight: "10px",
                          fontWeight: 400,
                        }}
                      >
                        {error}
                      </h3>
                    )}
                    <TextField
                      className={classes.textFieldClass}
                      margin="dense"
                      size="small"
                      label={`${editRole ? "Edit Role" : "Create Role"}`}
                      name="InterviewerEmail"
                      type="email"
                      value={routeName}
                      onChange={(e) => setRouteName(e.target.value)}
                      required
                    />
                    {editRole ? <Button
                      color="primary"
                      onClick={AddCreatedRole}
                      size="small"
                      variant="contained"
                      style={{ marginLeft: "15px", textDecoration: "none" }}
                    >
                      SAVE
                    </Button> : <Button
                      color="primary"
                      onClick={AddCreatedRole}
                      size="small"
                      variant="contained"
                      style={{ marginLeft: "15px", textDecoration: "none" }}
                      disabled={
                        routeId.length === 0 || routeName.trim().length === 0
                      }
                    >
                      ADD
                    </Button>}
                  </div>
                </div>
                <Table className={`learnerListing ${classes.tableWidth}`}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", width: "60px" }}>
                        Parent
                      </th>
                      <th style={{ textAlign: "left", width: "270px" }}>
                        Routes
                      </th>
                      <th style={{ textAlign: "left" }}>Children</th>
                      <th style={{ textAlign: "left" }}>
                      <Button variant="text" onClick={() => { setOpenRolePolicy(!openRolePolicy) }}>Role policy </Button>
                      {(isPloicyChange) ? <Chip label="Change ditected" color={chipColor} size="small" variant="outlined" /> : '' }
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {routes.length 
                     && routes?.map((item, index) => {
                      const UIoptions = possibleApis.filter(items => items?.routeId === item?.ROUTE_ID);
                        return (
                          <tr key={item?.ROUTE_ID}>
                            <td style={{
                                textAlign: "left",
                                verticalAlign: "baseline",
                              }}
                            >
                            <Checkbox
                              onClick={(e) => globalCheckboxHandler(e, item)}
                              checked={routeId.includes(item.ROUTE_ID)}
                            />
                            </td>
                            <td
                              style={{
                                textAlign: "left",
                                verticalAlign: "baseline",
                              }}
                            >
                              {item?.ROUTE_TITLE}
                            </td>
                              {item?.children?.length === 0 && item?.children.length === 0 && UIoptions.length > 0 && (
                                <><td>-</td>
                                  <td>
                                  <tr>
                                  <td
                                    style={{
                                      textAlign: "left",
                                      verticalAlign: "baseline",
                                      borderBottom: "none",
                                    }}
                                  >
                                  {roleId !== 1
                                  && <Select
                                      size="small"
                                      labelId="demo-multiple-checkbox-label"
                                      id="demo-multiple-checkbox"
                                      multiple
                                      value={muiSelectedApi}
                                      onChange={(event) => { handleChangeMulti(event, item?.ROUTE_ID) }}
                                      input={<OutlinedInput label={item?.ROUTE_TITLE} />}
                                      renderValue={(muiSelectedApi) => UIoptions.filter(item => muiSelectedApi.includes(item.id)).map(it => it.apiDesc).join(', ')}
                                      MenuProps={MenuProps}
                                      className={classes.dropdownClass}
                                  >
                                      {UIoptions.map((option: ApiOption) => (
                                        <MenuItem key={option.id} value={option.id}>
                                          <Checkbox checked={muiSelectedApi.some((item) => item === option.id)} />
                                          <ListItemText primary={option.apiDesc} />
                                        </MenuItem>
                                      ))}
                                  </Select>} 
                                  {/* {item?.ROUTE_ID} */}
                                  </td></tr>
                                  </td>
                                </>
                              )}
                            {(item?.children && item?.children?.length > 0) 
                            && <>
                              <td>
                                {item?.children?.map((itm, idx) => {
                                  // !TODO API access
                                  return (
                                  <>
                                  <tr key={itm?.ROUTE_ID}>
                                    <td style={{
                                        textAlign: "left",
                                        borderBottom: "none",
                                      }}
                                    >
                                      <Checkbox
                                        onClick={(e) => globalCheckboxHandler(e, itm)}
                                        checked={routeId.includes(itm.ROUTE_ID)}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "left",
                                        borderBottom: "none",
                                      }}
                                    >
                                      {itm?.ROUTE_TITLE}
                                    </td>
                                    
                                  </tr>
                                  </> 
                                  ) 
                                })}
                              </td>
                              <td>
                                {roleId !== 1 && item?.children?.map((itm, idx) => {
                                  // !TODO API access
                                  const options:ApiOption[] = possibleApis.filter(item => item?.routeId === itm?.ROUTE_ID)
                                  return (
                                  <>
                                  <tr key={itm?.ROUTE_ID}>
                                    <td
                                      style={{
                                        textAlign: "left",
                                        borderBottom: "none",
                                      }}
                                    >
                                      { options.length > 0
                                      && <>
                                      <Select
                                        size="small"
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={muiSelectedApi}
                                        onChange={(event) => { handleChangeMulti(event, itm?.ROUTE_ID) }}
                                        input={<OutlinedInput label={itm?.ROUTE_TITLE} />}
                                        renderValue={(muiSelectedApi) => options.filter(itm => muiSelectedApi.includes(itm.id)).map(it => it.apiDesc).join(', ')}
                                        MenuProps={MenuProps}
                                        className={classes.dropdownClass}
                                      >
                                        {options.map((option: ApiOption) => (
                                          <MenuItem key={option.id} value={option.id}>
                                            <Checkbox checked={muiSelectedApi.some((item) => item === option.id)} />
                                            <ListItemText primary={option.apiDesc} />
                                          </MenuItem>
                                        ))}
                                      </Select>
                                      {/* {itm.ROUTE_ID} */}
                                      </>}
                                    </td>
                                  </tr>
                                  </> 
                                  ) 
                                })}
                              </td>
                            </>}
                           
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Grid>
          </Card>
        </Box> : <div className={classes.circularProgressLoadingClass}><CircularProgress /></div>}
      </Container>
  );
};

export default CreateRole;
