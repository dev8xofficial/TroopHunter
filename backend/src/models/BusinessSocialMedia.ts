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
      allowNull: true,
    },
    twitterProfile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    instagramProfile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    linkedInProfile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    youTubeProfile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'BusinessSocialMedia',
  }
);

BusinessSocialMedia.sync();

export default BusinessSocialMedia;
