import * as React from "react";
import {
  Dialog,
  DialogContent,
  Alert,
  Button,
  Color,
  FormHelperText
} from "@material-ui/core";
import { useState, useRef } from "react";
import { useDispatch } from "src/store";
import { getRankPages, importRankMaster } from '../../../store/actions/getRankAction';
import toast from "react-hot-toast";

const ImportPopup = ({ openImport, setOpenImport, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setIsMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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
  const importRankData = async () => {
    const formData = new FormData();
    formData.append(
      "file", selectedFile
    );

    let data; let message; let error; let alert; let wrong;
    if (selectedFile && selectedFile?.name?.endsWith('.xlsx' || '.xls')) {
      const fetchedData = await dispatch(importRankMaster(formData));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else if (selectedFile) {
      error = true;
      wrong = true;
      message = "Please choose Correct file to Import"
    } else {
      message = "Please select file to Import";
      alert = true;
    }
    setSelectedFile(null);
    dispatch(getRankPages(page + 1, limit)).then(() => setIsLoading(false));

    inputRef.current.value = null;
    if (!error && !alert) {
      setOpenImport(!openImport)
      toast.success(message)
    } else if (alert) {
      displayMessage({ type: 'warning' as unknown as Color, 'message': message });
    } else if (wrong) {
      displayMessage({ type: 'error' as unknown as Color, 'message': message });
    } else {
      displayMessage({ type: 'error' as unknown as Color, 'message': message });
    }
  }
  return (
    <div>
      <Dialog open={openImport} maxWidth="sm" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>Import Rank Master</h2>
          {message ? <><Alert severity={MessageObj?.type}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <DialogContent>
              <input
                type="file"
                id="file"
                ref={inputRef}
                accept=".xlsx, application/vnd.ms-excel"
                required
                onChange={filehander}
              />
              <FormHelperText>Only Excel file (xlsx, xls) allow to import</FormHelperText>
              <Button sx={{ mt: 2, float: "right" }} variant="contained" onClick={() => importRankData()}>Upload</Button>
            </DialogContent>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export { ImportPopup }