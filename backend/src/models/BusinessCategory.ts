import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BusinessCategory extends Model {
  public id!: string;
  public name!: string;
}

BusinessCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BusinessCategory',
  }
);

BusinessCategory.sync();

export default BusinessCategory;
