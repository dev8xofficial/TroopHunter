import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IPostalCodeResponseAttributes } from 'validator/interfaces/PostalCode';

class PostalCode extends Model<IPostalCodeResponseAttributes> implements IPostalCodeResponseAttributes {
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
  }
);

PostalCode.sync();

export default PostalCode;
