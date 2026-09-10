import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const USERS = [
  {
    id: "1",
    username: "archit",
    password: "admin123",
    name: "Archit",
  },
];

export function login(username: string, password: string) {
  const user = USERS.find(
    (item) =>
      item.username === username &&
      item.password === password,
  );

  if (!user) {
    return null;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "1h" },
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
    },
  };
}