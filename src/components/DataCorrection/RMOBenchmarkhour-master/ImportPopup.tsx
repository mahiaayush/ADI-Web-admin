import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Alert,
  Grid,
  Button
} from "@material-ui/core";
import { useState, useRef } from "react";
import { useDispatch } from "src/store";
import { importRMOBenchmarkhour } from "src/store/actions/RMOBenchmarkhourAction";

const ImportPopup = ({ openImport, setOpenImport }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [message, setIsMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [alertmessage, setAlertmessage] = useState(null);
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: ''
    // deiails: { Inserted: 0, Updated: 0, ErrorInRow: 0, ErrorMessage: '' }
  })
  const filehander = (event) => {
    setSelectedFile(event.target.files[0]);
  }
  const displayMessage = (obj: { type: string, message: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const importRMOBenchmarkData = async () => {
    const formData = new FormData();
    formData.append(
      "file", selectedFile
    );

    let data; let message; let error; let alert;
    if (selectedFile) {
      const fetchedData = await dispatch(importRMOBenchmarkhour(formData));
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
      setAlertmessage('success');
      displayMessage({ 'type': 'success', 'message': message });
    } else if (alert && error) {
      setAlertmessage('warning');
      displayMessage({ 'type': 'error', 'message': message });
    } else {
      setAlertmessage('error');
      displayMessage({ 'type': 'error', 'message': message });
    }
  }
  return (
    <div>
      <Dialog open={openImport}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>Import Benchmarkhour</h2>
          {message ? <><Alert severity={alertmessage}><span />
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
              <Button onClick={() => importRMOBenchmarkData()}>Upload</Button>
            </DialogContent>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export { ImportPopup }