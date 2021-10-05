const faker = require('faker');

export function reviewer() {
  return {
    name: faker.name.findName(),
    company: faker.company.companyName(),
  };
}

// export function actor() {
//   return {
//     name: faker.name.findName(),
//     dob: faker.date.past,
//     pob: faker.address.city(),
//   };
// }

// export function studio() {
//   return {
//     name: faker.company.companyName(),
//     city: faker.address.city()
//   }
// }

module.exports = reviewer;
