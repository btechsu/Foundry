import React from 'react';
import { Loading } from '../../components/loading';
import { ViewGrid, CenteredGrid } from '../../components/layout';
import { Stretch } from './style';

export const LoadingView = () => {
  return (
    <ViewGrid>
      <CenteredGrid>
        <Stretch>
          <Loading />
        </Stretch>
      </CenteredGrid>
    </ViewGrid>
  );
};
