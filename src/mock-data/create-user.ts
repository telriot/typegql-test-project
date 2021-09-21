import faker from 'faker';
import bcrypt from 'bcryptjs';


const createUser = async () => ({
	firstName: faker.name.firstName(),
  lastName:faker.name.lastName(),
	password:await bcrypt.hash('password', 12),
  email:faker.internet.email()
});

export default createUser;
