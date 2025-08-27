import { type IBusinessCategoryAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class BusinessCategory extends Model<IBusinessCategoryAttributes> implements IBusinessCategoryAttributes {
  public id!: string;
  public name!: string;
}

BusinessCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'BusinessCategory',
    indexes: [
      {
        unique: true,
        fields: ['name'],
      },
    ],
  },
);

void BusinessCategory.sync();
