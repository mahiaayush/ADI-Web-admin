import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Button,
  Table,
  Card,
  Box,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "src/store";
import InternalUserRoleAction from "src/store/actions/InternalUserRolesAction";
import CreateRole from "./CreateRole";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  topheader: {
    paddingTop: "16px",
    position: "relative",
  },
  dispalyFlexMain: {
    display: "flex",
    alignItems: "start",
    justifyContent: "flex-start"
  }
});

const RoleListActions = () => {
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [roleId, setRoleId] = useState(null);
  const [roleObj, setRoleObj] = useState<any>(null);
  const [rolesList, setRolesList] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(InternalUserRoleAction())
  }, [])

  const Roles = useSelector(state => state?.internalUserRole?.internalUserRoleResponse?.data?.data)

  useEffect(() => {
    if (Roles?.length) {
      const getData = JSON.parse(JSON.stringify(Roles));
      setRolesList(getData)
    }
  }, [Roles])

  // rolesList.sort((a, b) => {
  //   return a.value - b.value;
  // });

  // console.log("rolesList", rolesList)

  const handleEdit = (role) => {
    setRoleId(role.RoleId)
    setRoleObj(role)
    setShowCreateRole(true)
    setEditRole(true)
  }

  return (
    <div>
      <Container className={`userIndex ${classes.topheader}`}>
      {!showCreateRole ? <><Grid item xs={12} position="relative">
          <Typography color="textPrimary" variant="h5">
            Role Master
          </Typography>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Card>
            <Grid className="counsellorApplicationListTable filterdataContner">
              <div className="DetailScreenSessionsMain">
                  <div className={classes.dispalyFlexMain}>
                    <Table className="learnerListing" style={{ width: "45%", border: "2px solid black" }}>
                      <thead>
                        <tr>
                          <th>Role-Id</th>
                          <th style={{ width: "180px" }}>Roles</th>
                          <th style={{ width: "90px" }}>Edit Roles</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {rolesList?.length && rolesList?.map((role) => <tr>
                          <td>{role?.RoleId}</td>
                          <td>{role?.RoleName}</td>
                          <EditIcon onClick={() => handleEdit(role)} style={{ fontSize: "15px", marginTop: "10px" }} />
                        </tr>)}
                      </tbody>
                    </Table>
                    <Button
                      color="primary"
                      onClick={() => { setShowCreateRole(true); setEditRole(false) }}
                      size="small"
                      variant="contained"
                      style={{ margin: "20px auto", textDecoration: "none", fontSize: "15px" }}
                    >
                      Create Role
                    </Button>
                  </div>
              </div>
            </Grid>
          </Card>
        </Box></> : <CreateRole setShowCreateRole={setShowCreateRole} editRole={editRole} roleId={roleId} roleObj={roleObj} />}
      </Container>
    </div>
  );
};

export default RoleListActions;
