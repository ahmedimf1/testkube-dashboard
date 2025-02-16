import {FilterType} from '@models/filters';

export const executionDateFormat = 'MMM d, p';

export const k8sResourceNameRegex = /^[a-z0-9]{0,1}[a-z0-9-.]+[a-z0-9]{1}$/;
export const secretRegex = /^[^*]+$/;

export const hasProtocol = (url: string) => {
  return /^http(s)?:\/\/.*/.test(url);
};

const arraylikeQueryParams: Record<FilterType | string, boolean> = {
  selector: true,
  status: true,
  textSearch: false,
};

export const isArraylikeQueryParam = (paramKey: FilterType | string) => {
  return arraylikeQueryParams[paramKey];
};

export const uppercaseFirstSymbol = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const isURL = (url: string) => {
  return /^http(s)?:\/\/.*/.test(url);
};
