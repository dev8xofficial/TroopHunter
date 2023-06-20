import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BusinessOperatingStatus extends Model {
  public id!: string;
  public operatingStatus!: string;
}

BusinessOperatingStatus.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    operatingStatus: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BusinessOperatingStatus',
  }
);

BusinessOperatingStatus.sync();

export default BusinessOperatingStatus;
