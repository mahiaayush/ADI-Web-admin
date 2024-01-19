import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Alert,
  Grid,
  Button,
  Color
} from "@material-ui/core";
import { useState, useRef } from "react";
import { useDispatch } from "src/store";
import { importRankingMapperMaster } from "src/store/actions/getRankingMapperAction";

const ImportPopup = ({ openImport, setOpenImport }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [message, setIsMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [MessageObj, setMessage] = useState({
    type: null,
    message: ''
  })
  const filehander = (event) => {
    setSelectedFile(event.target.files[0]);
  }
  const displayMessage = (obj: { type: Color, message: string }) => {
    setMessage(obj)
    setIsMessage(true);
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const importRankingMapperData = async () => {
    const formData = new FormData();
    formData.append(
      "file", selectedFile
    );
    let data; let message; let error; let alert;
    if (selectedFile) {
      const fetchedData = await dispatch(importRankingMapperMaster(formData));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
      setSelectedFile(null);
    } else {
      message = "Please choose file to Import";
      error = true;
      alert = true;
    }

    inputRef.current.value = null;
    if (!error) {
      displayMessage({ type: 'success' as unknown as Color, 'message': message });
    } else {
      displayMessage({ type: 'warning' as unknown as Color, 'message': message });
    }
  }
  return (
    <div>
      <Dialog open={openImport}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>Import Ranking-Mapper Master</h2>
          {message ? <><Alert severity={MessageObj?.type}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <DialogContent>
              <input
                ref={inputRef}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                // className={classes.input}
                id="icon-button-photo"
                // onChange={this.handleCapture}
                type="file"
                onChange={filehander}
              />
              <Button onClick={() => importRankingMapperData()}>Upload</Button>
            </DialogContent>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export { ImportPopup }