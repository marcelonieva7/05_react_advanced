import { type Dispatch, type RootState } from '@/@types/redux'
import { createListenerMiddleware } from '@reduxjs/toolkit'
import { signOut } from '../slices/auth/actions'
import { HTTPError } from '../../http/httpError'
import { HTTPCode } from '@/constants/http'

const authErrorMiddleware = createListenerMiddleware<RootState, Dispatch>()

function isHTTPError(payload: unknown): payload is HTTPError {
  return typeof payload === 'object' && payload !== null && 'status' in payload
}

authErrorMiddleware.startListening({
  predicate: (action) => {
    if (isHTTPError(action.payload)) {
      return action.type.endsWith('/rejected') && action.payload.status === HTTPCode.UNAUTHORIZED      
    }
    return false
  },
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(signOut())    
  }
})

export { authErrorMiddleware };
