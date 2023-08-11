import { z } from 'zod';

export const BusinessSocialMediaSchema = z.object({
  id: z.string().uuid(),
  businessId: z.string().uuid(),
  facebookProfile: z.string().nullable().optional(),
  twitterProfile: z.string().nullable().optional(),
  instagramProfile: z.string().nullable().optional(),
  linkedInProfile: z.string().nullable().optional(),
  youTubeProfile: z.string().nullable().optional(),
});
