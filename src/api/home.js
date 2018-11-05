import instance from './index';

//获取
export const request = params => {
  return instance.get(`/index.php/api/adver/index`, {params})
}
