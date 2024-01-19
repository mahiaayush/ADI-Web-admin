import type { FC } from 'react';
import type { Theme } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import type { SxProps } from '@material-ui/system';
import logo from '../../../assets/images/logo.png';
import logoWhite from '../../../assets/images/logoWhite.png';
import { cognito } from '../../../../config';

interface LogoProps {
  variant?: string;
  sx?: SxProps<Theme>;
}

const LogoRoot = experimentalStyled('img')``;

const Logo: FC<LogoProps> = (props) => (
  <LogoRoot
    /* src={props.variant === "white" ? logoWhite : logo} 
    https://static.launchmycareer.com/assets/logo/logoWhite.svg
    */
    src={`${cognito.cloudFrontURL}assets/logo/logoWhite.svg`}
    alt="logo"
    className="logoFilterclass"
    height={42}
    {...props}
  />
);

export default Logo;
