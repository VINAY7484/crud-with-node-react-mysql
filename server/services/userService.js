const db = require("../connectDB");

module.exports.getAllUsers = async () => {
  const [rows] = await db
    .query("SELECT * FROM users ")
    .catch((err) => console.log(err));
  return rows;
};
module.exports.getUserById = async (id) => {
  const [rows] = await db
    .query("SELECT * FROM users  WHERE id=?", [id])
    .catch((err) => console.log(err));
  return rows;
};
module.exports.deleteUser = async (id) => {
  const [rows] = await db
    .query("DELETE  FROM users  WHERE id=?", [id])
    .catch((err) => console.log(err));
  return rows.affectedRows;
};
module.exports.addOrEditUser = async (obj, id = 0) => {
  const [[[{ affectedRows }]]] = await db
    .query("Call usp_user_add_or_edit(?,?,?,?)", [
      id,
      obj.name,
      obj.email,
      obj.contact,
    ])
    .catch((err) => console.log(err));
  return affectedRows;
};
