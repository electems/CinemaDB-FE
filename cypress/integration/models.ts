import { faker } from "@faker-js/faker";

export const admin = {
  username: "admin",
  password: "admin",
};

export const userDataToCreate = {
  firstName: faker.lorem.word(),
  lastName: faker.lorem.word(),
  email: faker.lorem.word() + "@gmail.com",
  password: faker.lorem.word(),
  status: "ACTIVE",
  filmIndustry: "sandalhood",
  role: "USER",
};
export const userDataToUpadet = {
  firstName: faker.lorem.word(),
  lastName: faker.lorem.word(),
  email: faker.lorem.word() + "@gmail.com",
  password: faker.lorem.word(),
  status: "ACTIVE",
  filmIndustry: "sandalhood",
  role: "USER",
};
