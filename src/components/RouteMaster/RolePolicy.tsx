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
  Dialog,
  DialogContent,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

const RolePolicy = ({ openRolePolicy, setOpenRolePolicy, allApis, selectedApi, setSelectedApi }) => {
  // const [selectedApi, setSelectedApi] = useState([]);

  const handleChange = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      // if cheked and selectall checkbox add all fileds to selectedList
      if (name === "allSelect") {
        setSelectedApi(allApis);
      } else {
        // if cheked and specific checkbox add specific field to selectedList
        setSelectedApi([...selectedApi, data]);
      }
    } else {
      console.log(name)
      // if uncheked and selectall checkbox add remove all fileds from selectedList
      if (name === "allSelect") {
        setSelectedApi([]);
      } else {
        // if uncheked and specific checkbox remove specific field from selectedList
        setSelectedApi(selectedApi.filter((item) => item.id !== data.id));
      }
    }
  }

  return (
    <div>
      <Dialog open={openRolePolicy} onBackdropClick={() => setOpenRolePolicy(false)} fullWidth={true} maxWidth="md">
      <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
        <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenRolePolicy(false)}>x</Button></div>
        <h2 style={{ textAlign: 'center' }}>Role Base Policy </h2>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Checkbox
                    className="form-check-input"
                    name="allSelect"
                    // allSelect selected when both length equal
                    // slecteduser === allUser
                    checked={selectedApi?.length === allApis?.length}
                    onChange={(e) => handleChange(e, allApis)}
                    />
                    </TableCell>
                  <TableCell align="right">Method</TableCell>
                  <TableCell align="right">API Key</TableCell>
                  <TableCell align="right">API EndPoint&nbsp;(s)</TableCell>
                  <TableCell align="right">API Desc&nbsp;(s)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {allApis.length > 0 && allApis.map((data, ind) => (
                  <TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">
                    {ind + 1}.
                      <Checkbox 
                      className="form-check-input"
                      name={data.id}
                      // checked when selectedUser contains checked object/filed/row
                      checked={selectedApi.some((item) => item?.id === data.id)}
                      onChange={(e) => handleChange(e, data)}
                      /> {data.roleId}
                      </TableCell>
                    <TableCell align="right">{data.method}</TableCell>
                    <TableCell align="right">{data.apiKey}</TableCell>
                    <TableCell align="right">{data.apiEndpoint}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default RolePolicy;
