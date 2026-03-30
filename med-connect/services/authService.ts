import fs from "fs";
import path from "path";
import { compare, hash } from "bcrypt";

export type UserRole = "admin" | "doctor" | "receptionist" | "patient";

export interface UserData {
  id: number;
  username: string;
  email: string;
  password?: string;
  role?: UserRole;
  createdAt?: string;
}

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function getAllUsers(): UserData[] {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export function getByEmail(email: string): UserData | undefined {
  const data = getAllUsers();
  return data.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getById(id: number | string): UserData | undefined {
  const data = getAllUsers();
  return data.find((p) => p.id === Number(id));
}

// 3. Signup mein password hash karna zaroori hai
export async function saveData(username: string, email: string, password: string): Promise<void> {
  const data = getAllUsers();

  const found = data.find((user) => user.email.toLowerCase() === email.toLowerCase());

  if (found) {
    throw new Error("User Already Exist");
  }

  const hashedPassword = await hash(password, 12);

  const newUser: UserData = {
    id: data.length + 1,
    username,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: "patient", // Default role for all new users
    createdAt: new Date().toISOString(),
  };

  data.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Update user role by ID
export function updateUserRole(id: number | string, newRole: UserRole): boolean {
  const data = getAllUsers();
  const userIndex = data.findIndex((u) => u.id === Number(id));
  
  if (userIndex === -1) {
    return false;
  }

  data[userIndex].role = newRole;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return true;
}

// Get all doctors
export function getAllDoctors(): UserData[] {
  const data = getAllUsers();
  return data.filter((u) => u.role === "doctor");
}