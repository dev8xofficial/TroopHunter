import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BusinessSocialMedia extends Model {
  public id!: string;
  public businessId!: string;
  public facebookProfile!: string;
  public twitterProfile!: string;
  public instagramProfile!: string;
  public linkedInProfile!: string;
  public youTubeProfile!: string;
}

BusinessSocialMedia.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    businessId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    facebookProfile: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    twitterProfile: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    instagramProfile: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    linkedInProfile: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    youTubeProfile: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BusinessSocialMedia',
  }
);

BusinessSocialMedia.sync();

export default BusinessSocialMedia;
