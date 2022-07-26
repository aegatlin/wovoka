import { type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  reporter: 'dot',
  timeout: 10000,
  use: {
    baseURL: 'http://localhost:3000',
  },
  workers: 1,
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true
  },
}

export default config
