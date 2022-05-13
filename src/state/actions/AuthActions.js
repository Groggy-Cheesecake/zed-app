import { signup, signin, checkAvailability, updateUser } from '../../services/AuthService'

export default {
  ['auth/CHECK_AVAILABLITY']: data => checkAvailability(data),
  ['auth/SIGNUP']: data => signup(data),
  ['auth/SIGNIN']: data => signin(data),
  ['user/UPDATE']: (data, signed_message) => updateUser(data, signed_message),
}
