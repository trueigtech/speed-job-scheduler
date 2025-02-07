import Redis from 'ioredis'
import config from '../configs/app.config'

const connectionOptions = {
  host: config.get('redis.host'),
  port: config.get('redis.port'),
  password: config.get('redis.password'),
  maxRetriesPerRequest: null,
  enableReadyCheck: false
}

export default {
  connectionOptions,
  publisherClient: new Redis(connectionOptions),
  subscriberClient: new Redis(connectionOptions),
  client: new Redis(connectionOptions)
}