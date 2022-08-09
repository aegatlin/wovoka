import { type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  reporter: 'dot',
  timeout: 10000,
  use: {
    baseURL: 'http://localhost:3001',
  },
  maxFailures: 1,
  workers: 1,
  webServer: {
    command: 'npm run dev -- --port=3001',
    port: 3001,
  },
}

export default config
