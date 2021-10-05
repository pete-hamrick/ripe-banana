const faker = require('faker');

const reviewer = () => {
  return {
    name: faker.name.findName(),
    company: faker.company.companyName(),
  };
};

const studio = () => {
  return {
    name: faker.company.companyName(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
  };
};

module.exports = { reviewer, studio };
// export function actor() {
//   return {
//     name: faker.name.findName(),
//     dob: faker.date.past,
//     pob: faker.address.city(),
//   };
// }

// module.exports = [reviewer];
