import {useContext} from 'react';

import {ExecutionStatuses} from '@models/executions';
import {TestSuiteExecutionStatusesEnum} from '@models/testSuiteExecutions';

import {ExecutionStepIcon} from '@molecules';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {StyledExecutionStatus} from '../ExecutionDetails.styled';

const TestExecutionDetailsStatus: React.FC = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {executionResult} = data;

  return (
    <>
      <ExecutionStepIcon icon={executionResult?.status} />
      {executionResult?.status ? (
        <StyledExecutionStatus status={executionResult?.status}>
          {TestSuiteExecutionStatusesEnum[executionResult?.status as ExecutionStatuses]}
        </StyledExecutionStatus>
      ) : null}
    </>
  );
};

export default TestExecutionDetailsStatus;
