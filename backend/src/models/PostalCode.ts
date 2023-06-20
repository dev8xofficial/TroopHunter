import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { PostalCodeAttributes } from '../types/business/postalCode';

class PostalCode extends Model<PostalCodeAttributes> implements PostalCodeAttributes {
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
    },
  },
  {
    sequelize,
    modelName: 'PostalCode',
  }
);

PostalCode.sync();

export default PostalCode;
