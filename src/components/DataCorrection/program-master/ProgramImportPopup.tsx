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
import { importProgramMaster } from '../../../store/actions/getProgramAction';
 
const ImportPopup = ({ openImport, setOpenImport }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [message, setIsMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState();  
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: ''
  })
  const filehander = (event) => {
    setSelectedFile(event.target.files[0]);
  }
  const displayMessage = (obj: { type: string, message: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const importProgramData = async () => {
    const formData = new FormData();
    formData.append(
      "file", selectedFile
    );
    const { data, message, error } = await dispatch(importProgramMaster(formData));
    
    inputRef.current.value = null;
    if (!error) {
      displayMessage({ 'type': 'success', 'message': message });
    } else {
      displayMessage({ 'type': 'error', 'message': message });
    }
  }
  return (
    <div>
      <Dialog open={openImport}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
        <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
        <h2 style={{ textAlign: 'center' }}>Import Program Master</h2>
        {message ? <><Alert severity="success"><span />
        {MessageObj?.message}
        </Alert></> : '' }
        
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
                <Button onClick={() => importProgramData()}>Upload</Button>
            </DialogContent>
        </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export { ImportPopup }