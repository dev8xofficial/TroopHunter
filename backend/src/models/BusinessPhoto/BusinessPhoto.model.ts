import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { BusinessPhotoAttributes } from './BusinessPhoto.interface';

class BusinessPhoto extends Model<BusinessPhotoAttributes> implements BusinessPhotoAttributes {
  public id!: string;
  public businessId!: string;
  public photoUrl!: string;
  public description!: string;
}

BusinessPhoto.init(
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
    photoUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BusinessPhoto',
  }
);

BusinessPhoto.sync();

export default BusinessPhoto;
