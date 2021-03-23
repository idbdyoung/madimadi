import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import endpoint from '../../../endpoint';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: endpoint.GOOGLE_CLIENT_ID,
      clientSecret: endpoint.GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
})
