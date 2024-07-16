import { type Dispatch, type RootState } from '@/@types/redux'
import { createListenerMiddleware } from '@reduxjs/toolkit'
import { HTTPError } from '../../http/httpError'
import { notification } from '@/libs/notification/notificationService'

const notificationErrorMiddleware = createListenerMiddleware<RootState, Dispatch>()

function isHTTPError(payload: unknown): payload is HTTPError {
  return typeof payload === 'object' && payload !== null && 'status' in payload
}

notificationErrorMiddleware.startListening({
  predicate: (action) => {
    if (isHTTPError(action.payload)) {
      return action.type.endsWith('/rejected')
    }
    return false
  },
  effect: async (action) => {
    if (isHTTPError(action.payload)) {
      notification.error(action.payload.message)
    }
  }
})

export { notificationErrorMiddleware };
