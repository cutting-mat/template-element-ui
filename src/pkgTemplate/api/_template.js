import {instance} from '@/common/api';

//
export const login = params => {
  return instance.post(`/login`, params)
}
