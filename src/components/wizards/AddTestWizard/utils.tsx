import {FormInstance} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {CheckCircleOutlined, LoadingOutlined, QuestionCircleOutlined, WarningOutlined} from '@ant-design/icons';

import {Executor} from '@models/executors';
import {Option} from '@models/form';
import {SourceWithRepository} from '@models/sources';

import {testSourceLink} from '@utils/externalLinks';
import {k8sResourceNameMaxLength, k8sResourceNamePattern, required, url} from '@utils/form';

import Colors from '@styles/Colors';

type testSourceBaseOptionsType = (Option & {docsURI: string})[];

export const testSourceBaseOptions: testSourceBaseOptionsType = [
  {value: 'git', label: 'Git', docsURI: testSourceLink},
  {value: 'file-uri', label: 'File', docsURI: testSourceLink},
  {value: 'string', label: 'String', docsURI: testSourceLink},
];

export const pathPlaceholders: {[key: string]: string} = {
  postman: 'tests/postman/collection.json',
  cypress: 'tests/cypress',
  curl: 'tests/curl/test.json',
  k6: 'tests/k6/index.js',
  soapui: 'tests/soapui/test.xml',
  artillery: 'tests/artillery/test.yaml',
  gradle: 'tests/gradle/my-test',
  maven: 'tests/maven/my-test',
  kubepug: 'tests/kubepug/test.json',
  ginkgo: 'tests/ginkgo/my-test',
  jmeter: 'tests/jmeter/test.jmx',
  playwright: 'tests/playwright/my-test',
};

export const addTestFormStructure = (options: Option[]) => [
  {
    // tooltip: 'Enter the name of the test you wish to add.',
    rules: [required, k8sResourceNamePattern, k8sResourceNameMaxLength],
    fieldName: 'name',
    inputType: 'default',
    placeholder: 'Name',
    itemLabel: 'Name',
    required: true,
  },
  {
    // tooltip: 'Tests are single executor orientated objects. Tests can have different types, depending on which executors are installed in your cluster. If you don’t see your type listed, you may add your own executor.',
    fieldName: 'testType',
    inputType: 'select',
    rules: [required],
    options,
    placeholder: 'Type',
    itemLabel: 'Type',
    required: true,
  },
];

export const testSourceFieldConfig = {
  // tooltip: 'Tests can be added from two sources: A simple file with the test content e.g. Postman collection JSON file Git - the repository, path and branch of where tests are stored.',
  rules: [required],
  fieldName: 'testSource',
  inputType: 'select',
  placeholder: 'Source',
  dataTest: 'test-creation_type_source_option',
  itemLabel: 'Test Source',
  required: true,
};

export const tooltipIcons: {[key: string]: JSX.Element} = {
  loading: <LoadingOutlined />,
  success: <CheckCircleOutlined style={{color: Colors.lime400}} />,
  error: <WarningOutlined style={{color: Colors.amber400}} />,
  default: <QuestionCircleOutlined />,
};

export const gitFormFields = (
  type: string,
  uriState = {
    status: 'default',
    message: 'We do currently only support checking out repositories via https',
  }
) => [
  {
    tooltip: {title: uriState.message, icon: tooltipIcons[uriState.status]},
    rules: [required, url],
    required: true,
    fieldName: 'uri',
    inputType: 'default',
    placeholder: 'e.g.: https://github.com/myCompany/myRepo.git',
    itemLabel: 'Git repository URI',
  },

  {
    tooltip: 'If required by your repository enter your Personal Access Token (PAT). ',
    fieldName: 'token',
    inputType: 'default',
    modificator: 'password',
    placeholder: 'Git Token',
    itemLabel: 'Git Token',
  },
  {
    // tooltip: 'If required by your repository enter your Personal Access Token (PAT). ',
    fieldName: 'username',
    inputType: 'default',
    placeholder: 'Your username',
    itemLabel: 'Git username',
  },
  {
    // tooltip: 'We’ve entered a default of main, however you can specify any branch.',
    rules: [required],
    fieldName: 'branch',
    required: true,
    inputType: 'default',
    placeholder: 'e.g.: main',
    itemLabel: 'Branch',
  },
  {
    tooltip: 'The path is relative to the root of your repository',
    fieldName: 'path',
    inputType: 'default',
    placeholder: pathPlaceholders[type] || 'tests/path',
    itemLabel: 'Path',
  },
];

export const gitFormFieldsEdit = (
  type: string,
  uriState = {
    status: 'default',
    message: 'We do currently only support checking out repositories via https',
  }
) => [
  {
    tooltip: {title: uriState.message, icon: tooltipIcons[uriState.status]},
    rules: [required, url],
    required: true,
    fieldName: 'uri',
    inputType: 'default',
    placeholder: 'e.g.: https://github.com/myCompany/myRepo.git',
    itemLabel: 'Git repository URI',
  },
  {
    // tooltip: 'We’ve entered a default of main, however you can specify any branch.',
    rules: [required],
    fieldName: 'branch',
    required: true,
    inputType: 'default',
    placeholder: 'e.g.: main',
    itemLabel: 'Branch',
  },
  {
    tooltip: 'The path is relative to the root of your repository',
    fieldName: 'path',
    inputType: 'default',
    placeholder: pathPlaceholders[type] || 'tests/path',
    itemLabel: 'Path',
  },
];

export const fileContentFormFields = () => [
  {
    rules: [required],
    required: true,
    fieldName: 'file',
    inputType: 'uploadWithInput',
    placeholder: 'File',
    itemLabel: 'File',
  },
];

export const customTypeFormFields = () => [
  {
    // tooltip: 'We’ve entered a default of main, however you can specify any branch.',
    fieldName: 'branch',
    inputType: 'default',
    placeholder: 'e.g.: main',
    itemLabel: 'Branch',
  },
  {
    tooltip: 'The path is relative to the root of your repository',
    fieldName: 'path',
    inputType: 'default',
    placeholder: 'e.g.: tests/cypress',
    itemLabel: 'Path',
  },
];

export const stringContentFormFields = () => [
  {
    rules: [required],
    fieldName: 'string',
    required: true,
    inputType: 'textarea',
    placeholder: 'String',
    itemLabel: 'String',
  },
];

export const getTestSourceSpecificFields = (values: any, isTestSourceCustomGitDir?: boolean) => {
  const {testSource} = values;

  if (isTestSourceCustomGitDir) {
    return {
      repository: {
        ...(values.path ? {path: values.path} : {}),
        ...(values.branch ? {branch: values.branch} : {}),
        uri: '',
        type: '',
      },
    };
  }

  if (testSource === 'string' || testSource === 'file-uri') {
    return {data: values.string || values.file.fileContent, repository: {}};
  }

  const secrets = (() => {
    const result: any = {};

    if (values.token !== undefined && values.token !== null) {
      if (values.token === '') {
        result.tokenSecret = {};
      } else if (!values.token.includes('*')) {
        result.token = values.token;
      }
    }

    if (values.username !== undefined) {
      if (values.username === '') {
        result.usernameSecret = {};
      } else if (!values.username.includes('*')) {
        result.username = values.username;
      }
    }

    return result;
  })();

  return {
    data: '',
    repository: {
      type: 'git',
      uri: values.uri,
      ...(values.path ? {path: values.path} : {}),
      ...(values.branch ? {branch: values.branch} : {}),
      ...secrets,
    },
  };
};

export const remapExecutors = (executors: Executor[]) => {
  if (!executors || !executors.length) {
    return [];
  }

  const array: Option[] = [];

  executors.forEach(executorItem => {
    const {
      executor: {types, executorType},
    } = executorItem;

    if (types) {
      types.forEach(type => {
        array.push({label: type, value: type});
      });
    } else if (executorType) {
      array.push({label: executorType, value: executorType});
    }
  });

  return array;
};

export const remapTestSources = (testSources: SourceWithRepository[]) => {
  if (!testSources || !testSources.length) {
    return [];
  }

  const array: Option[] = [];

  testSources.forEach(source => {
    const {name} = source;

    const optionValue = `$custom-git-dir-${name}`;
    const optionName = `Git source: ${name}`;

    array.push({value: optionValue, label: optionName});
  });

  return array;
};

export const onFileChange = (file: Nullable<UploadChangeParam>, form: FormInstance) => {
  if (!file) {
    form.setFieldsValue({
      file: null,
    });

    form.validateFields(['file']);
  } else {
    const readFile = new FileReader();

    readFile.onload = e => {
      if (e && e.target) {
        const fileContent = e.target.result;

        if (fileContent) {
          form.setFieldsValue({
            file: {
              fileContent: fileContent as string,
              fileName: file.file.name,
            },
          });

          form.validateFields(['file']);
        }
      }
    };

    // @ts-ignore
    readFile.readAsText(file.file);
  }
};