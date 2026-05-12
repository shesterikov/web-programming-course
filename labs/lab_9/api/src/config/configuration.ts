export default () => ({
  app: {
    env: process.env.APP_ENV || 'development',
    port: parseInt(process.env.PORT as string, 10) || 4200,
    cacheTtl: parseInt(process.env.CACHE_TTL_DEFAULT as string, 10) || 300,
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE as string, 10) || 10485760,
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },

  databases: {
    postgresql: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT as string, 10) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      name: process.env.DB_NAME || 'postgres',
    },
    mongodb: {
      uri: process.env.MONGO_URI || '',
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT as string, 10) || 6379,
      password: process.env.REDIS_PASSWORD || 'password',
    },
  },

  services: {
    minio: {
      endpoint: process.env.MINIO_ENDPOINT!,
      accessKey: process.env.MINIO_ACCESS_KEY!,
      secretKey: process.env.MINIO_SECRET_KEY!,
      bucket: process.env.MINIO_BUCKET!,
      useSSL: process.env.MINIO_USE_SSL === 'true',
    },
    rabbitmq: {
      host: process.env.RABBITMQ_HOST || 'localhost',
      user: process.env.RABBITMQ_USER!,
      password: process.env.RABBITMQ_PASS!,
      queue: process.env.QUEUE_USER_REGISTERED!,
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string, 10),
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASS,
      from: process.env.SMTP_FROM,
      secure: process.env.SMTP_SECURE === 'true',
    },
  },

  oauth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
  },
});
