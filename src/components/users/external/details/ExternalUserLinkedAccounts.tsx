import {
    Card, CardHeader,
    Divider,
    Button,
    TextField, Grid, Box, DialogContentText
  } from '@material-ui/core';
  import { useMemo, useState } from 'react';
  import LinkOffIcon from '@material-ui/icons/LinkOff';
  import EmailIcon from '@material-ui/icons/Email';
  import IconButton from '@material-ui/core/IconButton';
  import '../../userList.css';
  import EventPagination from '../../../common/dataTable/EventPagination';
  import {
    externalUnlinkEntity, externalAddLinkedAccounts
  } from '../../../../store/actions/externalUserAction';
  import { useDispatch } from '../../../../store';
  import Modal from '../../../common/reusable/Modal';
  import toast from 'react-hot-toast';

  const ExternalUserEntityInfo = ({ LinkedAccounts = [], userLinkedAccountsList = () => {}, userSID = "" }) => {
    const dispatch = useDispatch();
    const [unlinkEntityModal, setUnlinkEntityModal] = useState(false);
    const [entityJoinCode, setEntityJoinCode] = useState("");
    const [linkID, setLinkID] = useState("");
    const UnlinkBadge = (row) => {
        return (<IconButton color="primary" aria-label="upload picture" onClick={() => { setUnlinkEntityModal(true); setLinkID(row.EntityId) }} component="span"><LinkOffIcon /></IconButton>)
    }
    const handleUnlinkEntity = () => {
        dispatch(externalUnlinkEntity(userSID, linkID)).then((data: any) => {
        if (data?.status) {
            setUnlinkEntityModal(false);
            userLinkedAccountsList()
        } else {
            toast.error(data?.message)
        }
        })
    }

    const addLinkedAccount = () => {
        dispatch(externalAddLinkedAccounts(userSID, entityJoinCode)).then((data: any) => {
            if (data?.status) {
                userLinkedAccountsList()
                setEntityJoinCode('')
            } else {
                toast.error(data?.message)
            }
            })
    }
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'EntityName',
            },
            {
                Header: 'Unlink',
                id: ' ',
                accessor: UnlinkBadge,
            }
        ],
        []
    )

    return (
        <>
          <Card className="linked_account">
            <CardHeader title="Linked Accounts" />
            <Divider className="header_divider" />
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    p: 0
                }}
            >
              <div className="textbuttonpadding">
                  <TextField
                      fullWidth
                      label="Enter Join Code"
                      name="joinCode"
                      variant="outlined"
                      className="joincode"
                      value={entityJoinCode}
                      onChange={(e) => setEntityJoinCode(e.target.value)}
                  />
                  <Button
                      startIcon={<EmailIcon fontSize="small" />}
                      sx={{
                      backgroundColor: 'primary',
                      color: 'error.contrastText',
                      mt: 3,
                      '&:hover': {
                          backgroundColor: 'primary'
                      }
                      }}
                      variant="contained"
                      onClick={addLinkedAccount}
                  >
                      Join
                  </Button>
                </div>
                <Box sx={{ mt: 3 }}>
                    <Card className="externalTable externalTablePagination">
                        {LinkedAccounts.length ? <Grid item>
                            <EventPagination
                                columns={columns}
                                data={LinkedAccounts}
                            />
                        </Grid>
                        : <Grid item sx={{ px: 2, pb: 2 }}>
                            <h3 className="text-center dropdownIcon">No record found...</h3>
                        </Grid>}
                    </Card>
                </Box>
            </Box>
            {unlinkEntityModal && <Modal
            open={unlinkEntityModal}
            title="Unlink Entity"
            onClose={() => setUnlinkEntityModal(false)}
            actions={<>
            <Button variant="outlined" color="secondary" onClick={() => setUnlinkEntityModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleUnlinkEntity}>Confirm</Button>
            </>}
            >
            <DialogContentText>Are you sure you want to <b>Unlink Entity</b> ?</DialogContentText>
        </Modal>}
            </Card>
            </>
    );
}

  export default ExternalUserEntityInfo;