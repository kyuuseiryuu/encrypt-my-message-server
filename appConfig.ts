export default {
  listen: '0.0.0.0',
  port: 30021,
  mongo: {
    urls: process.env.MONGO || `mongodb://db/emm_server`,
    opts: { useNewUrlParser: true },
  },
  dataMaxSaveDays: 3,
}
