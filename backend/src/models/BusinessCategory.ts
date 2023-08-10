import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IBusinessCategoryResponseAttributes } from 'validator/interfaces/BusinessCategory';

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
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'BusinessCategory',
    indexes: [
      {
        unique: true,
        fields: ['name'],
      },
    ],
  }
);

BusinessCategory.sync();

export default BusinessCategory;
