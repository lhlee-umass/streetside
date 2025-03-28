import { cleanEnv, bool } from 'envalid'

export const env = cleanEnv(import.meta.env, {
  VITE_USE_MOCK_DATA: bool({ default: false }),
})
