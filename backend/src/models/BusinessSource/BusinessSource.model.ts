import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { IBusinessSourceResponseAttributes } from './BusinessSource.interface';

class BusinessSource extends Model<IBusinessSourceResponseAttributes> implements IBusinessSourceResponseAttributes {
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
