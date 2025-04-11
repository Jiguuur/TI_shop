import bcrypt from "bcryptjs";

const employees = [
  {
    firstName: "Admin",
    lastName: "User",
    gender: "Male",
    email: "admin@ti.mn",
    phoneNumber: "99001122",
    role_name: "admin",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    firstName: "Finance",
    lastName: "Manager",
    gender: "Female",
    email: "finance@ti.mn",
    phoneNumber: "99223344",
    role_name: "financier",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    firstName: "Transport",
    lastName: "Manager",
    gender: "Male",
    email: "transport@ti.mn",
    phoneNumber: "99445566",
    role_name: "transport_manager",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    firstName: "Cash",
    lastName: "Handler",
    gender: "Female",
    email: "cashier@ti.mn",
    phoneNumber: "99667788",
    role_name: "cashier",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default employees;
