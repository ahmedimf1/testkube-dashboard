import styled from 'styled-components';

import {Button} from '@custom-antd';

import Colors from '@styles/Colors';

export const StyledWizardContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 1240px;
  padding: 45px 25px 25px 25px;
  border: 1px solid ${Colors.grey3};
  border-radius: 14px;

  background: ${Colors.greyBGSecondary};
`;

export const StyledWizardTitle = styled.span`
  display: block;

  margin: 0px 0px 0px 24px;
  padding-bottom: 45px;

  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;

  color: ${Colors.grey450};
`;

export const StyledWizardBody = styled.div`
  display: flex;
  flex: 1;

  min-height: 550px;
  border-radius: 4px;
`;

export const StyledWizardForm = styled.div`
  flex: 4;

  padding: 30px 45px 30px 25px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  background: ${Colors.grey3};
`;

export const StyledWizardHintContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;

  padding: 60px 20px 20px 20px;

  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  background: ${Colors.greyHover};
`;

export const WizardHintText = styled.span<{fontWeight?: any; fontSize?: any}>`
  text-align: center;
  font-style: normal;
  font-weight: ${({fontWeight}) => fontWeight || 600};
  font-size: ${({fontSize}) => `${fontSize || 16}px`};
  line-height: 32px;
  /* or 200% */

  text-align: center;

  color: ${Colors.grey450};
`;

export const StyledWizardFooter = styled.div`
  padding: 24px;
`;

export const StyledWizardButton = styled(Button)`
  color: ${Colors.purple};
  background: transparent;
  border: none;
`;

export const StyledWizardParagraph = styled.span``;