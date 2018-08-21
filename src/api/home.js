import instance from './index';

//获取
const request = params => {
  return instance.get(`/index.php/api/adver/index`, {params})
}

export {
  request
}
