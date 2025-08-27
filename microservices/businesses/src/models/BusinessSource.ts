import { type IBusinessSourceAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class BusinessSource extends Model<IBusinessSourceAttributes> implements IBusinessSourceAttributes {
  public id!: string;
  public sourceName!: string;
}

BusinessSource.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    sourceName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'BusinessSource',
  },
);

void BusinessSource.sync();
