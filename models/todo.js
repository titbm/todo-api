module.exports = function (dataBaseManager, dataTypes) {
  return dataBaseManager.define('todo', { // create table if not exists 'todo'...
    description: {
      type: dataTypes.STRING,
        allowNull: false, // not null
        validate: {
          len: [1, 250] // 1<=length<=250
        }
    },
    completed: {
      type: dataTypes.BOOLEAN,
      allowNull: false, // not null
      defaultValue: false // default
    }
  });
};
