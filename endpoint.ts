export default {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? '',
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
  DATABASE_URL: '',
  REDIS_URL: process.env.NEXT_PUBLIC_REDIS_URL ?? '',
  JWT_SECRET: process.env.NEXT_PUGLIC_JWT_SECRET ?? '',
}
