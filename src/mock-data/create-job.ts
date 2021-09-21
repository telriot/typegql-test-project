import { pickRandom } from './utils';
import faker from 'faker';

const jobNames = [
	'Senior Frontend Developer',
	'Senior Backend Developer',
	'Junior Frontend Developer',
	'Junior Backend Developer',
	'Graphic Designer',
	'UI/UX Designer',
	'Scrum Master',
	'Agile Coach'
];

const createJob = (postedBy: string) => ({
	name: pickRandom(jobNames),
	postedBy,
	companyName: faker.company.companyName()
});

export default createJob;
