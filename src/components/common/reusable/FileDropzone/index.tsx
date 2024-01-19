import type { FC } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import XIcon from './X';
import bytesToSize from '../../../../utils/bytesToSize';
import addFileIcon from '../../../../../public/images/undraw_add_file2_gvbb.svg'

// interface FileDropzoneProps extends DropzoneOptions {
//   files?: any[];
//   onRemove?: (file: any) => void;
//   onRemoveAll?: () => void;
//   onUpload?: () => void;
// }

const useStyles = makeStyles(() => ({
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 60,
    height: 60,
    padding: 4,
    boxSizing: 'border-box'
  },
  img: {
    display: 'block',
    width: '60px',
    height: '60px',
    border: 'none',
    userSelect: 'none',
    overflow: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const FileDropzone: FC<any> = (props) => {
  const styles = useStyles();

  const {
    accept,
    disabled,
    files,
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onRemoveAll,
    onUpload,
    preventDropOnDocument,
    ...other
  } = props;

  // We did not add the remaining props to avoid component complexity
  // but you can simply add it if you need to.
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
  });

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          border: 1,
          borderRadius: 1,
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          p: 2,
          ...(isDragActive && {
            backgroundColor: 'action.active',
            opacity: 0.5,
          }),
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            '& img': {
              width: 60,
            },
          }}
        >
          <img alt="Select file" src={addFileIcon} />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography color="textPrimary" variant="h6">
            {`Select file${maxFiles && maxFiles === 1 ? '' : 's'}`}
          </Typography>
          {typeof accept === "object" && <Typography color="textPrimary" variant="body1">
            supported file types are {Object.values(accept).map((ext: string[]) => ext.join(' ')).join(' ')}
          </Typography>}
          <Box sx={{ mt: 2 }}>
            <Typography color="textPrimary" variant="body1">
              {`Drop file${maxFiles && maxFiles === 1 ? '' : 's'}`}{' '}
              <Link color="primary" underline="always">
                browse
              </Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </Box>
      </Box>
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <List>
            {files.map((file) => (
              <ListItem
                key={file.path}
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  '& + &': {
                    mt: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <div className={styles.thumb}>
                    <div>
                      {file.type.includes('image') ? <img
                        src={file.preview}
                        className={styles.img}
                        // Revoke data uri after image is loaded
                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                        alt="preview"
                      /> : <iframe
                        src={file.preview}
                        className={styles.img}
                        title="preview"
                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                        width={60}
                        height={60}
                        scrolling="no"
                      />}
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  primaryTypographyProps={{
                    color: 'textPrimary',
                    variant: 'subtitle2',
                  }}
                  secondary={bytesToSize(file.size)}
                />
                <Tooltip title="Remove">
                  <IconButton edge="end" onClick={() => onRemove && onRemove(file)}>
                    <XIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>
  );
};

FileDropzone.propTypes = {
  // accept: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.arrayOf(PropTypes.string)
  // ]),
  disabled: PropTypes.bool,
  files: PropTypes.array,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
};

FileDropzone.defaultProps = {
  files: [],
};

export default FileDropzone;
