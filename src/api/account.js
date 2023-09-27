import request from '../utils/request'

export function validatePassword(accountForm) {
  return request({
    url: '/account/password',
    method: 'post',
    data: accountForm
  })
}

export function updateUser(accountForm) {
  return request({
    url: `/user/updataPerson`,
    method: 'post',
    data: accountForm
  })
}

export function login(accountForm) {
  return request({
    url: '/user/login',
    method: 'post',
    data: accountForm
  })
}

export function qqLoginCallback(searchobj) {
  return request({
    url: '/user/qqLogin/callback',
    method: 'get',
    params: searchobj
  })
}

