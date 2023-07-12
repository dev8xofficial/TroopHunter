import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BusinessRating extends Model {
  public id!: string;
  public ratingValue!: number;
  public description!: string;
}

BusinessRating.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ratingValue: {
      type: DataTypes.FLOAT(2, 1),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'BusinessRating',
  }
);

BusinessRating.sync();

export default BusinessRating;
