import { OAuth2Client } from 'google-auth-library';
import endpoint from '../../endpoint';

const googleClient = new OAuth2Client(endpoint.GOOGLE_CLIENT_ID);

export default googleClient;
