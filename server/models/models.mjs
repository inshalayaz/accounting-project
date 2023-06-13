import { Sequelize } from 'sequelize';
import sequelize from '../config/config.mjs';

const { DataTypes } = Sequelize;

export const AccountModel = sequelize.define('Accounts', {
  account_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  account_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  account_type: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  account_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

export const ClosedAccountModel = sequelize.define('ClosedAccounts', {
  closed_account_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  account_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Accounts',
      key: 'account_id',
    },
  },
  account_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  account_type: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  account_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});



export const JournalEntryModel = sequelize.define('JournalEntries', {
  entry_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  transaction_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  transaction_type: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  account_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Accounts',
      key: 'account_id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  entry_type: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
});


export const PastJournalEntryModel = sequelize.define('PastJournalEntries', {
  entry_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  transaction_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  transaction_type: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  account_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Accounts',
      key: 'account_id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  entry_type: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
});
// Define the relationship between Account and JournalEntry

AccountModel.hasMany(JournalEntryModel, { foreignKey: 'account_id' });
JournalEntryModel.belongsTo(AccountModel, { foreignKey: 'account_id' });
PastJournalEntryModel.belongsTo(AccountModel, { foreignKey: 'account_id' });
ClosedAccountModel.belongsTo(AccountModel, { foreignKey: 'account_id' });

(async () => {
  const queryInterface = sequelize.getQueryInterface();
  const tableNames = await queryInterface.showAllTables();

  for (const tableName of tableNames) {
    const foreignKeyConstraints = await queryInterface.getForeignKeyReferencesForTable(tableName);

    for (const constraint of foreignKeyConstraints) {
      const { constraintName } = constraint;
      await queryInterface.removeConstraint(tableName, constraintName);
    }
  }

})();