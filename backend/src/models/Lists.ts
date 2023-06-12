import { BelongsToCreateAssociationMixin, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { ListsAttributes } from '../types/lists';
import User from './User';

class Lists extends Model<ListsAttributes> implements ListsAttributes {
  public id?: string;
  public titles?: string;
  public ownerId!: string;
  public leads!: string[];

  // Define associations, if any
  public createUser!: BelongsToCreateAssociationMixin<User>;

  // Define scopes, if any
}

Lists.init(
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
    modelName: 'Lists',
  }
);

// Lists.belongsTo(User, { foreignKey: 'ownerId' });

Lists.sync();

export default Lists;
