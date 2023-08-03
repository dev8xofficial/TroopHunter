import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import Lead from '../Lead/Lead.model';
import Business from '../Business/Business.model';
import { LeadBusinessAttributes } from './LeadBusiness.interface';

class LeadBusiness extends Model<LeadBusinessAttributes> implements LeadBusinessAttributes {
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
