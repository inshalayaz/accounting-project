import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('financial_accounting', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;