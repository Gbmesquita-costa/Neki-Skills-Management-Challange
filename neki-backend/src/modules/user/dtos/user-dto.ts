interface User {
  id?: string;
  role?: "ADMIN" | "USER";
  email: string;
  password: string;
}

export { User };
