import { BelongsToCreateAssociationMixin, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { ListAttributes } from '../types/list';
import User from './User';

class List extends Model<ListAttributes> implements ListAttributes {
  public id?: string;
  public titles?: string;
  public ownerId!: string;
  public leads!: string[];

  // Define associations, if any
  public createUser!: BelongsToCreateAssociationMixin<User>;

  // Define scopes, if any
}

List.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    titles: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    leads: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'List',
  }
);

// List.belongsTo(User, { foreignKey: 'ownerId' });

List.sync();

export default List;
