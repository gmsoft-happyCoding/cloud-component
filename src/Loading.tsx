import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';

const Wrap = styled.div`
  text-align: center;
`;

const Loading = () => (
  <Wrap>
    <Skeleton variant="rect" />
  </Wrap>
);

export default Loading;
