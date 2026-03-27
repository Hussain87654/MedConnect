import fs from "fs";
import path from "path";

// File path set kar rahe hain (JSON file location)
const filePath = path.join(process.cwd(), "src", "data", "users.json");

/**
 * Saare users ko read karne ke liye
 */
export function getAllUsers() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Agar file nahi milti ya khali hai toh empty array return karein
    return [];
  }
}

/**
 * ID ke zariye user find karne ke liye
 */
export function getById(id) {
  const data = getAllUsers();
  const user = data.find((p) => p.id === Number(id));
  return user;
}

export function signinByEmail () {
  
}

export function saveData(email, password) {
  const data = getAllUsers();

  // Check karein ke user pehle se toh nahi hai
  const found = data.find((user) => user.email === email);

  if (found) {
    throw new Error("User Already Exist");
  }

  // Naya data push karein
  data.push({
    id: data.length + 1,
    email,
    password,
  });

  // File mein wapis write kar dein
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}