import { getPayload } from 'payload';
import config from '@payload-config';

// Cache the Payload instance across requests (Fluid Compute reuses the module).
export const getPayloadClient = () => getPayload({ config });
