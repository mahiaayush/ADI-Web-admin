import { ExtendButtonBaseTypeMap } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

const ShowButton = ({ id, label, size, variant, color }) => {
    const navigate = useNavigate();
    return (<Button
        size={size}
        variant={variant}
        color={color}
        type="button"
        onClick={() => { navigate(`/entity/${id}`) }}
    >{label}</Button>)
}

export default ShowButton;
