import React from 'react';
import styled from 'styled-components';

import {Typography, Button} from '@atoms';

import {TestsContext} from '@context/testsContext';

const StyledTestTextDescription = styled.td`
  border: none;
`;

const StyleTestFilterButtons = styled.td`
  display: flex;
  align-items: baseline;
  justify-content: center;
  border: none;
`;

const TestsFilter = () => {
  const tests: any = React.useContext(TestsContext);

  const isActive = (status: string) => {
    if (tests?.filters?.filter?.length === 0 && status === 'all') {
      return true;
    }
    return tests?.filters?.filter?.indexOf(status) !== -1;
  };
  const filtersTests = (status: string) => {
    if (tests.filters?.filter?.indexOf(status) === -1) {
      tests.filters?.filter?.push(status);

      if (status === 'all') {
        tests.setFilters({filter: [], dateFilter: ''});
      } else {
        const filtered = tests.filters?.filter?.filter((filter: any) => filter !== 'all');

        tests.setFilters({...tests.filters, filter: filtered});
        tests.setFilters(tests.filters);
      }
    } else {
      let filtered = tests?.filters?.filter?.filter((filter: any) => filter !== status);

      tests.setFilters({...tests?.filters, filter: filtered});
    }
  };
  return (
    <>
      <StyledTestTextDescription>
        <Typography variant="secondary" color="secondary" font="light" data-testid="Test filters">
          Tests
        </Typography>
      </StyledTestTextDescription>
      <StyleTestFilterButtons>
        <Typography variant="secondary" color="secondary" font="light">
          Show:{' '}
        </Typography>
        <Button disabled={!tests.testsExecution} active={isActive('all')} onClick={() => filtersTests('all')}>
          All
        </Button>
        <Button disabled={!tests.testsExecution} active={isActive('pending')} onClick={() => filtersTests('pending')}>
          Running
        </Button>
        <Button disabled={!tests.testsExecution} active={isActive('success')} onClick={() => filtersTests('success')}>
          Passed
        </Button>
        <Button disabled={!tests.testsExecution} active={isActive('error')} onClick={() => filtersTests('error')}>
          Failed
        </Button>
      </StyleTestFilterButtons>
    </>
  );
};

export default TestsFilter;
