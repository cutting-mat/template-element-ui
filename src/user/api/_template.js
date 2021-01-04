import {instance} from '@/api';

//
export const login = params => {
  return instance.post(`/login`, params)
}
