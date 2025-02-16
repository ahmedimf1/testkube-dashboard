import {useContext, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';

import {Tabs} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource, setCurrentSource} from '@redux/reducers/sourcesSlice';

import useLocation from '@hooks/useLocation';

import {safeRefetch} from '@utils/fetchUtils';

import {useGetSourceDetailsQuery} from '@services/sources';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';

import {StyledContainer, StyledPageHeader} from './SourceDetails.styled';
import SourceSettings from './SourceSettings';

const SourceDetails = () => {
  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);
  const {pageTitle} = useContext(ConfigContext);

  const currentSourceDetails = useAppSelector(selectCurrentSource);

  const name = useLocation().lastPathSegment;

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: sourceDetails, refetch} = useGetSourceDetailsQuery(name, {skip: !isClusterAvailable});

  const isPageDisabled = !name;

  useEffect(() => {
    if (sourceDetails) {
      dispatch(setCurrentSource(sourceDetails));
    }
  }, [sourceDetails]);

  useEffect(() => {
    safeRefetch(refetch);
  }, [location]);

  return (
    <StyledContainer>
      <Helmet>
        <title>{`${name} | Sources | ${pageTitle}`}</title>
      </Helmet>
      <StyledPageHeader onBack={() => navigate('/sources')} title={name} className="testkube-pageheader" />
      <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} destroyInactiveTabPane>
        <Tabs.TabPane tab="Settings" key="Settings" disabled={isPageDisabled}>
          {currentSourceDetails ? <SourceSettings /> : null}
        </Tabs.TabPane>
      </Tabs>
    </StyledContainer>
  );
};

export default SourceDetails;
