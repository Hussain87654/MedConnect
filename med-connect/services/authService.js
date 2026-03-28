import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function getAllUsers() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}


export function getById(id) {
  const data = getAllUsers();
  const user = data.find((p) => p.id === Number(id));
  return user;
}


export function saveData(username , email, password) {
  const data = getAllUsers();

  const found = data.find((user) => user.email === email);

  if (found) {
    throw new Error("User Already Exist");
  }

  data.push({
    id: data.length + 1,
    username ,
    email,
    password,
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}