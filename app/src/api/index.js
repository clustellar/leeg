import Horizon from '@horizon/client/dist/horizon-dev.js'

const secure = !!process.env.API_SECURE
const host = process.env.API_HOST || 'localhost'
const path = process.env.API_PATH || 'horizon'

export default function (app) {
  const hz = app.horizon = new Horizon({ secure: secure, host: host, path: path, authType: 'token' })

  if (!hz.hasAuthToken()) {
    app.$toast.open({ type: 'is-warning', message: 'Loggin in...' })
    hz.authEndpoint('google').subscribe((endpoint) => {
      window.location.replace(endpoint)
    })
  } else {
    app.$toast.open({ type: 'is-success', message: 'You are already logged in!' })
  }

  hz.connect()
}
