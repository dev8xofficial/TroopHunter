import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Lead from './Lead';
import Business from './Business';

class LeadBusiness extends Model {
  public leadId!: string;
  public businessId!: string;
}

LeadBusiness.init(
  {
    leadId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    businessId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'LeadBusiness',
    timestamps: false,
  }
);

// Add the correct associations for LeadBusiness model
Lead.belongsToMany(Business, { through: LeadBusiness, foreignKey: 'leadId' });
Business.belongsToMany(Lead, { through: LeadBusiness, foreignKey: 'businessId' });

export default LeadBusiness;
