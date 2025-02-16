import {useContext} from 'react';

import {Form, Input} from 'antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import {Permissions, usePermission} from '@permissions/base';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledSpace} from '../Settings.styled';
import {namingMap, updateRequestsMap} from '../utils';

const {TextArea} = Input;

type NameNDescriptionFormValues = {
  name: string;
  description: string;
};

const NameNDescription: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);
  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<NameNDescriptionFormValues>();

  const [updateEntity] = updateRequestsMap[entity]();

  if (!entity || !entityDetails) {
    return null;
  }

  const name = entityDetails?.name;
  const description = entityDetails?.description;

  const onSave = (values: NameNDescriptionFormValues) => {
    updateEntity({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        name: values.name,
        description: values.description,
        executionRequest: {
          description: values.description,
        },
      },
    }).then(res => {
      displayDefaultNotificationFlow(res, () => {
        notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} was successfully updated.`);
      });
    });
  };

  return (
    <Form
      form={form}
      onFinish={onSave}
      name="general-settings-name-description"
      initialValues={{name, description}}
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title={`${uppercaseFirstSymbol(namingMap[entity])} name & description`}
        description="Define the name and description of the project which will be displayed across the Dashboard and CLI"
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <StyledSpace size={32} direction="vertical">
          <StyledFormItem name="name" rules={[required]}>
            <Input placeholder="Name" disabled />
          </StyledFormItem>
          <StyledFormItem name="description">
            <TextArea placeholder="Description" autoSize={{minRows: 2, maxRows: 3}} />
          </StyledFormItem>
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default NameNDescription;
