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

const actor = () => {
  return {
    name: faker.name.findName(),
    dob: faker.date.past(),
    pob: faker.address.city(),
  };
};

const film = () => {
  const randomDate = Math.floor(Math.random() * 121) + 1900;
  const randomStudio = Math.ceil(Math.random() * 3);
  return {
    title: faker.random.words(3),
    released: randomDate,
    studioId: randomStudio.toString()
  };
};
module.exports = { reviewer, studio, actor, film };

