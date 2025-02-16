import {Layout, Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

import SiderLink from './SiderLink';

export const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
  }

  svg {
    overflow: visible;
  }
`;

export const StyledOther = styled(Space)`
  padding-bottom: 40px;
`;

export const StyledSider = styled(Layout.Sider)<{$isFullScreenLogOutput?: boolean}>`
  z-index: ${({$isFullScreenLogOutput}) => ($isFullScreenLogOutput ? '1002' : '1')};

  .ant-layout-sider-children {
    display: flex;
    align-items: stretch;
    flex: 1 auto;
    flex-direction: column;
  }
`;

export const StyledSiderChildContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-top: 30px;
  width: 100px;
  min-height: 100%;
  overflow: auto;
`;

export const StyledNavigationMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSiderLink = styled(SiderLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;

  svg {
    fill: #64748b;
  }

  &.settings-icon {
    svg {
      width: 30px;
      height: 30px;
    }
  }

  &.active,
  &:hover {
    svg {
      fill: ${Colors.whitePure};

      transition: 0.3s all;
    }
  }
`;

export const StyledOtherItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.3s;

  svg {
    width: 20px;
    height: 20px;

    fill: #64748b;

    cursor: pointer;

    &:hover {
      fill: ${Colors.whitePure};

      transition: 0.3s all;
    }
  }

  &.active {
    svg {
      fill: ${Colors.whitePure};

      transition: 0.3s all;
    }
  }
`;
