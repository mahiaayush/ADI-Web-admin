import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';
import * as Icons from "@material-ui/icons";
import { List, ListSubheader } from '@material-ui/core';
import type { ListProps } from '@material-ui/core';
import NavItem from './NavItem';

interface Item {
  path?: string;
  ROUTE_ICON: string;
  icon?: ReactNode;
  info?: ReactNode;
  children?: Item[];
  ROUTE_TITLE: string;
  ROUTE_SLUG?: string;
}

interface NavSectionProps extends ListProps {
  ROUTES: Item[];
  pathname: string;
  ROLE_NAME: string;
}

const renderNavItems = ({
  depth = 0,
  ROUTES,
  pathname
}: {
  ROUTES: Item[];
  pathname: string;
  depth?: number;
}): JSX.Element => (
  <List disablePadding>
    {ROUTES.reduce(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
      (acc, item) => reduceChildRoutes({
        acc,
        item,
        pathname,
        depth
      }),
      []
    )}
  </List>
);

const reduceChildRoutes = ({
  acc,
  pathname,
  item,
  depth
}: {
  acc: JSX.Element[];
  pathname: string;
  item: Item;
  depth: number;
}): Array<JSX.Element> => {
  const key = `${item.ROUTE_TITLE}-${depth}`;
  const Icon = Icons[item.ROUTE_ICON]
  const exactMatch = item.ROUTE_SLUG ? !!matchPath({
    path: item.ROUTE_SLUG,
    end: true
  }, pathname) : false;

  if (item.children.length !== 0) {
    const partialMatch = item.ROUTE_SLUG ? !!matchPath({
      path: item.ROUTE_SLUG,
      end: true
    }, pathname) : false;

    acc.push(
      <NavItem
        active={partialMatch}
        depth={depth}
        icon={<Icon fontSize="small" />}
        info={item.info}
        key={key}
        open={partialMatch}
        path={item.ROUTE_SLUG}
        ROUTE_TITLE={item.ROUTE_TITLE}
      >
        {renderNavItems({
          depth: depth + 1,
          ROUTES: item.children,
          pathname
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        active={exactMatch}
        depth={depth}
        icon={<Icon fontSize="small" />}
        info={item.info}
        key={key}
        path={item.ROUTE_SLUG}
        ROUTE_TITLE={item.ROUTE_TITLE}
      />
    );
  }

  return acc;
};

const NavSection: FC<NavSectionProps> = (props) => {
  const {
    ROUTES,
    pathname,
    ROLE_NAME,
    ...other
  } = props;

  return (
    <List
      subheader={(
        <ListSubheader
          disableGutters
          disableSticky
          sx={{
            color: 'text.primary',
            fontSize: '0.75rem',
            lineHeight: 2.5,
            fontWeight: 700,
            textTransform: 'uppercase'
          }}
        >
          {ROLE_NAME}
        </ListSubheader>
      )}
      {...other}
    >
      {renderNavItems({
        ROUTES,
        pathname
      })}
    </List>
  );
};

NavSection.propTypes = {
  ROUTES: PropTypes.array,
  pathname: PropTypes.string,
  ROLE_NAME: PropTypes.string
};

export default NavSection;
