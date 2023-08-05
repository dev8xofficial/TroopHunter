import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { IBusinessCategoryResponseAttributes } from './BusinessCategory.interface';

class BusinessCategory extends Model<IBusinessCategoryResponseAttributes> implements IBusinessCategoryResponseAttributes {
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
