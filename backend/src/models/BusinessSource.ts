import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { SourceAttributes } from '../types/businessSource';

class BusinessSource extends Model<SourceAttributes> implements SourceAttributes {
  public id!: string;
  public sourceName!: string;
}

BusinessSource.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
