import * as React from 'react';
import MuiLink from '@mui/material/Link';
import { Link as GatsbyLink } from 'gatsby';

const Link = React.forwardRef(function Link(props, ref) {
  return <MuiLink target="_blank" component={GatsbyLink} ref={ref} {...props} />;
});

export default Link;
