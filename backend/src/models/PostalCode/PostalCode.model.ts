import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { IPostalCodeResponseAttributes } from './PostalCode.interface';

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
  }
);

PostalCode.sync();

export default PostalCode;
