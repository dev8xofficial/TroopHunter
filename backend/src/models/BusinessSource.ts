import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IBusinessSourceAttributes } from 'validator/interfaces/BusinessSource';

class BusinessSource extends Model<IBusinessSourceAttributes> implements IBusinessSourceAttributes {
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
  }
);

BusinessSource.sync();

export default BusinessSource;
