import { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../common/reusable/Modal';
import FileDropzone from '../common/reusable/FileDropzone';
import uploadImageIcon from '../../../public/images/upload_image.png';

const useStyles = makeStyles(() => ({
  modal: {
    width: '100%',
    height: '100%',
    maxWidth: 500,
    minWidth: 300,
    minHeight: 250,
    maxHeight: 500,
  },
  successContainer: {
    paddingTop: '80px',
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    height: '100%',
  },
  uploadImage: {
    position: 'relative',
  },
  frontImage: {
    backgroundColor: '#FFFFFF',
  },
  blurredImage: {
    position: 'absolute',
    top: '-40%',
    left: '27%',
    transform: 'rotate(330deg)',
    scale: 0.8,
    opacity: 0.7,
  },
}));

const UploadFiles = ({
  open = false,
  onClose = () => {},
  onSubmit = (files) => {},
  maxFiles = 1,
}) => {
  const styles = useStyles();
  const [showError, setShowError] = useState(false);
  const [step, setStep] = useState(0);
  const [type, setType] = useState([]);
  const [files, setFiles] = useState([]);

  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async () => {
    setUploaded(true);
  };

  const handleDropFiles = async (files: File[]) => {
    files = await Promise.all(files.map(async (file) => {
      // const preview = await toBase64(file);
      const preview = URL.createObjectURL(file);
      return Object.assign(file, {
        preview,
      })
    }));

    if (!maxFiles) {
      setFiles((prev) => {
        prev = prev.filter((item: File) => !files.find((file) => file.name === item.name));
        return [...prev, ...files];
      });
    } else {
      setFiles(files);
    }
  };

  const handleRemoveFile = (file: File): void => {
    setFiles((prev) => prev.filter((item: File) => item.name !== file.name));
  };

  const handleClose = () => {
    if (uploaded) {
      onSubmit(files);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      classes={{ paper: styles.modal }}
      title=""
      actions={
        uploaded ? (
          <Button onClick={handleClose} variant="contained" color="primary" fullWidth>
            Done
          </Button>
        ) : (
          <Button onClick={handleUpload} disabled={!files.length} variant="contained" color="primary" fullWidth>
            Save
          </Button>
        )
      }
    >
      <div>
        {uploaded ? (
          <div className={styles.successContainer}>
            <div className={styles.uploadImage}>
              <img src={uploadImageIcon} alt="upload" className={styles.frontImage} />
              <img src={uploadImageIcon} alt="upload" className={styles.blurredImage} />
            </div>
            <Typography color="textPrimary" variant="h5" margin="dense">
              Uploaded Successfully
            </Typography>
            <Typography color="textPrimary" variant="subtitle1" margin="dense" fontWeight="normal">
              We’ll let system know that you uploaded files.
            </Typography>
          </div>
        ) : (
          <FileDropzone
            accept={{ 'image/*': ['.jpg', '.png'] }}
            onDrop={handleDropFiles}
            files={files}
            onRemove={handleRemoveFile}
            maxFiles={maxFiles}
          />
        )}
      </div>
    </Modal>
  );
};

UploadFiles.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default UploadFiles;
