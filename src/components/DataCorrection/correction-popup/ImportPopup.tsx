import * as React from "react";
import {
  Dialog,
  DialogContent,
  Alert,
  Button,
  LinearProgress,
  FormHelperText
} from "@material-ui/core";
import { useState, useRef } from "react";
import { useDispatch } from "src/store";

export type Color = 'success' | 'info' | 'warning' | 'error';
const initMsgObj: { type: Color, message: string, details: string } = {
  type: 'success',
  message: '',
  details: ''
}
const ImportExcelPopup = ({ openImport, setOpenImport, importAction, refresh, popupTitle = '' }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [message, setIsMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isProcessing, setisProcessing] = useState(false)
  const [MessageObj, setMessage] = useState(initMsgObj)
  let msgType: Color = 'success';
  const displayMessage = (magobj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(magobj)
    setTimeout(() => { setIsMessage(false) }, 5000);
    dispatch(refresh)
  }

  const filehander = (event) => {
    const fileExt = event?.target?.files[0]?.name?.split('.')?.pop()?.toUpperCase();
    if (fileExt === 'XLS' || fileExt === 'XLSX') {
      setSelectedFile(event.target.files[0]);
    } else {
      msgType = 'error'
      displayMessage({ 'type': msgType, 'message': 'Only xls or xlsx file allow', 'details': '' });
    }
  }

  const importCourseDetailsData = async () => {
    let data; let message; let error; let alert;
    if (selectedFile) {
      const formData = new FormData();
      formData.append(
        "file", selectedFile
      );
      setisProcessing(true)
      await dispatch(importAction(formData)).then(res => {
        data = res?.data;
        message = res?.message;
        if (!message) {
          error = true;
          message = res?.error?.ErrorMessage || res?.error?.message
        }
        setisProcessing(false);
        return res;
      });
    } else {
      message = "Please choose file to Import"; error = true;
    }
    setSelectedFile(null);
    inputRef.current.value = null;
    if (!error) {
      displayMessage({ 'type': 'success', 'message': message, 'details': data });
      setTimeout(() => {
        setOpenImport(!openImport)
        setIsMessage(false);
      }, 3000)
    } else {
      displayMessage({ 'type': 'error', 'message': message, 'details': error?.message });
    }
  }
  return (
    <div>
      <Dialog open={openImport} maxWidth="sm" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => { setOpenImport(!openImport); setIsMessage(false) }}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{popupTitle}</h2>
          {message ? <><Alert severity={MessageObj.type} style={{ wordBreak: 'break-all' }}>{MessageObj?.message}</Alert></> : ''}
          <DialogContent>
            {isProcessing && <LinearProgress color="secondary" />}
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
              <FormHelperText>Only Excel file (xlsx, xls) allow to import</FormHelperText>
              <Button sx={{ mt: 2, float: "right" }} variant="contained" color="primary" onClick={() => importCourseDetailsData()}>Upload</Button>
            </DialogContent>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
export { ImportExcelPopup }