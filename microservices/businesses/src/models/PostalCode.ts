import { type IPostalCodeAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class PostalCode extends Model<IPostalCodeAttributes> implements IPostalCodeAttributes {
  public id!: string;
  public code!: string;
}

PostalCode.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'PostalCode',
    indexes: [
      {
        unique: true,
        fields: ['code'],
      },
    ],
  },
);

void PostalCode.sync();
