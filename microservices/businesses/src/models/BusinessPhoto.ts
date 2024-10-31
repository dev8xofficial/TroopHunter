import { type IBusinessPhotoAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class BusinessPhoto extends Model<IBusinessPhotoAttributes> implements IBusinessPhotoAttributes {
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
      unique: true,
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
  },
);

void BusinessPhoto.sync();
