const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING },
});

const Project = sequelize.define("project", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, defaultValue: "Absent" },
});

const Task = sequelize.define("task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  endDate: { type: DataTypes.DATE, allowNull: false },
  progress: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.STRING, defaultValue: "В процессе выполнения" },
});

const UserTask = sequelize.define("user_task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  spentTime: { type: DataTypes.STRING, defaultValue: "0:0:0" },
  status: { type: DataTypes.STRING, defaultValue: "assigned" },
});

const UserProject = sequelize.define("user_project", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(UserTask);
UserTask.belongsTo(User);

Task.hasMany(UserTask);
UserTask.belongsTo(Task);

Project.hasMany(Task);
Task.belongsTo(Project);

User.belongsToMany(Project, { through: "user_project" });
Project.belongsToMany(User, { through: "user_project" });

module.exports = {
  User,
  Task,
  Project,
  UserTask,
  UserProject,
};
