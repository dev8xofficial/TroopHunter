import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BusinessSource extends Model {
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
    },
  },
  {
    sequelize,
    modelName: 'BusinessSource',
  }
);

BusinessSource.sync();

export default BusinessSource;
