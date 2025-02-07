import convict from 'convict'
import dotenv from 'dotenv'
import fs from 'fs'

if (fs.existsSync('.env')) {
  const envConfig = dotenv.parse(fs.readFileSync('.env'))

  for (const key in envConfig) {
    process.env[key] = envConfig[key]
  }
}

const config = convict({
  app: {
    name: {
      doc: 'trueIGtech User BE',
      format: String,
      default: 'trueIGtech User BE'
    },
    appName: {
      doc: 'Name of the application',
      format: String,
      default: 'trueIGtech User',
      env: 'APP_NAME'
    },
    userFrontendUrl: {
      doc: 'User Frontend Url',
      format: String,
      default: '',
      env: 'USER_FRONTEND_URL'
    },
    userBackendUrl: {
      doc: 'User Backend Url',
      format: String,
      default: '',
      env: 'USER_BACKEND_URL'
    },
    adminBackendUrl: {
      default: '',
      env: 'ADMIN_BACKEND_URL'
    },
  },
  basic: {
    username: {
      doc: 'basic username for authentication middleware.',
      default: 'admin',
      env: 'BASIC_USERNAME'
    },
    password: {
      doc: 'basic password for authentication middleware.',
      default: 'admin',
      env: 'BASIC_PASSWORD'
    },
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4000,
    env: 'PORT'
  },
  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL'
  },
  sequelize: {
    name: {
      default: 'test_db',
      env: 'DB_NAME'
    },
    user: {
      default: 'dev_test',
      env: 'DB_USER'
    },
    password: {
      default: '123456',
      env: 'DB_PASSWORD'
    },
    readHost: {
      default: 'localhost',
      env: 'DB_READ_HOST'
    },
    writeHost: {
      default: 'localhost',
      env: 'DB_WRITE_HOST'
    },
    port: {
      default: 5433,
      env: 'DB_PORT'
    },
    sync: {
      default: false,
      env: 'DB_SYNC'
    }
  },

  redis: {
    host: {
      default: 'localhost',
      env: 'REDIS_HOST'
    },
    port: {
      default: 6379,
      env: 'REDIS_PORT'
    },
    password: {
      default: '',
      env: 'REDIS_PASSWORD'
    }
  },
  socket: {
    encryptionKey: {
      default: '',
      env: 'SOCKET_ENCRYPTION_KEY'
    },
    maxPerUserConnection: {
      default: 2,
      env: 'SOCKET_MAX_PER_USER_CONNECTION'
    }
  },
  jwt: {
    tokenSecret: {
      default: '',
      env: 'JWT_LOGIN_SECRET'
    },
    tokenExpiry: {
      default: '2d',
      env: 'JWT_LOGIN_TOKEN_EXPIRY'
    },
    resetPasswordKey: {
      default: '',
      env: 'RESET_PASSWORD_KEY'
    },
    emailTokenExpiry: {
      default: '',
      env: 'EMAIL_TOKEN_EXPIRY'
    },
    emailTokenKey: {
      default: '',
      env: 'EMAIL_TOKEN_KEY'
    }
  },
  email: {
    mailjetApiKey: {
      default: '',
      env: 'MAILJET_API_KEY'
    },
    mailjetSecretKey: {
      default: '',
      env: 'MAILJET_SECRET_KEY'
    },
    senderName: {
      default: 'GS Casino',
      env: 'EMAIL_SENDER_NAME'
    },
    senderEmail: {
      default: 'GS Casino',
      env: 'EMAIL_SENDER_EMAIL'
    }
  },
  mailGun: {
    apiKey: {
      default: '',
      env: 'MAILGUN_API_KEY'
    },
    domain: {
      default: '',
      env: 'MAILGUN_DOMAIN'
    },
    senderEmail: {
      default: '',
      env: 'SENDER_EMAIL'
    },
  },
  aws: {
    bucket: {
      default: '',
      env: 'AWS_BUCKET'
    },
    region: {
      default: 'us-east-1',
      env: 'AWS_REGION'
    },
    accessKeyId: {
      default: '',
      env: 'AWS_ACCESS_KEY'
    },
    secretAccessKey: {
      default: '',
      env: 'AWS_SECRET_ACCESS_KEY'
    }
  },
})

config.validate({ allowed: 'strict' })

module.exports = config
