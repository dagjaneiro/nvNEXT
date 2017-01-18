import { createAction } from '../../common/utils'

export const QUICK_OPEN = 'QUICK_OPEN'
export const QUICK_CREATE = 'QUICK_CREATE'
export const QUICK_CREATE_SEARCH = 'QUICK_CREATE_SEARCH'

export const quickOpen = createAction(QUICK_OPEN, (open) => ({ open }))
export const quickCreate = createAction(QUICK_CREATE, (open) => ({ open }))
export const quickCreateSearch = createAction(QUICK_CREATE_SEARCH, (text) => ({ text }))
