import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('accounting_project', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;