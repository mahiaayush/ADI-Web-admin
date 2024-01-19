import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: (theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: (theme.palette.common.white, 0.25),
        },
        padding: '10px 10px',
        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing(0),
        //     width: 'auto',
        // },
    },
    searchIcon: {
        width: theme.spacing(45),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textField: {
        borderRadius: 0,
        width: '375px'
    },
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
      }
}))

export default useStyles;