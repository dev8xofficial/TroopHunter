export interface IBusinessSocialMediaRequestAttributes {
  businessId: string;
  facebookProfile?: string;
  twitterProfile?: string;
  instagramProfile?: string;
  linkedInProfile?: string;
  youTubeProfile?: string;
}

export interface IBusinessSocialMediaResponseAttributes extends IBusinessSocialMediaRequestAttributes {
  id: string;
}
