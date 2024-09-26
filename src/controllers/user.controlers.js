import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const { rows } = await pool.query("select * from users");
  res.json(rows);
};

export const getUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { rows } = await pool.query("select * from users where id = $1", [id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(rows);
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const { rows } = await pool.query(
      "insert into users (name, email) values($1, $2) returning *",
      [name, email],
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  try {
    const { rows, rowCount } = await pool.query(
      "update users set name = $1, email = $2 where id = $3 returning *",
      [name, email, id],
    );
    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { rowCount } = await pool.query("delete from users where id = $1", [
      id,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
