import { FC, useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useCreateJobMutation, useGetCurrentUserQuery } from 'src/graphql';

export interface JobCreatorProps {
	className?: string;
}
export const JobCreator: FC<JobCreatorProps> = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [jobName, setJobName] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [createJob, { loading: isCreating }] = useCreateJobMutation({
		refetchQueries: ['GetJobs']
	});
	const { data: userData } = useGetCurrentUserQuery();

	const handleSubmit = async () => {
		await createJob({
			variables: {
				createJobInput: {
					name: jobName,
					companyName,
					postedBy: userData?.getCurrentUser?._id!
				}
			}
		});
		setJobName('');
		setCompanyName('');
	};

	return (
		<Box marginBottom={2}>
			<Button
				onClick={() => setIsOpen((prev) => !prev)}
				color='primary'
				variant='contained'
				sx={{ marginBottom: '1rem' }}>
				{isOpen ? 'Cancel' : 'Create new job'}
			</Button>
			{isOpen && (
				<Box display='flex'>
					<TextField
						value={jobName}
						onChange={(e) => setJobName(e.target.value)}
						placeholder='Name'
						sx={{ marginRight: '1rem' }}
					/>
					<TextField
						value={companyName}
						onChange={(e) => setCompanyName(e.target.value)}
						placeholder='Company'
					/>
					<Button disabled={isCreating} onClick={handleSubmit}>
						Submit
					</Button>
				</Box>
			)}
		</Box>
	);
};
