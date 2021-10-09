import { FC, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { AppBarLayout } from 'src/layouts/AppBarLayout';
import getIsAuth from 'src/utils/getIsAuth';
import authRedirect from 'src/utils/authRedirect';
import { useDebounce } from 'use-debounce';
import { useGetJobsLazyQuery, User } from 'src/graphql';
import {
	Button,
	CircularProgress,
	List,
	Typography,
	TextField
} from '@mui/material';
import JobItem from 'src/components/JobItem';
import { JobCreator } from 'src/components/JobCreator';

export interface JobsPageProps {
	user?: User;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const user = await getIsAuth(ctx);
	if (!user) return authRedirect(ctx);
	return { props: { user } };
};

const PAGE_SIZE = 3;
const JobsPage: FC<JobsPageProps> = () => {
	const [searchValue, setSearchValue] = useState('');
	const [debouncedSearchValue] = useDebounce(searchValue, 300);

	const [fetchJobs, { loading, data, error, fetchMore }] = useGetJobsLazyQuery({
		variables: {
			getJobsSkip: 0,
			getJobsTake: PAGE_SIZE,
			getJobsName: debouncedSearchValue
		}
	});
	useEffect(() => {
		fetchJobs({
			variables: {
				getJobsSkip: 0,
				getJobsTake: PAGE_SIZE,
				getJobsName: debouncedSearchValue
			}
		});
	}, [debouncedSearchValue]);

	const handleFetchMore = async () => {
		if (!fetchMore) return;
		await fetchMore({
			variables: { getJobsSkip: data?.getJobs.length, getJobsTake: PAGE_SIZE }
		});
	};

	return (
		<AppBarLayout isAuth={true}>
			<JobCreator/>
			<TextField
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				sx={{ marginBottom: '2rem' }}
				placeholder='Search jobs'
			/>
			{error && <div> something went wrong </div>}
			{!data?.getJobs?.length && loading && <CircularProgress />}
			{Boolean(data?.getJobs.length) && (
				<>
					{' '}
					<Typography variant='h3'>Listed Jobs</Typography>
					<List>
						{data?.getJobs.map((job) => (
							<JobItem key={job._id} job={job} />
						))}
					</List>
					<Button disabled={loading} onClick={handleFetchMore}>
						Load more{' '}
						{loading && (
							<CircularProgress sx={{ marginLeft: '.25rem' }} size={16} />
						)}
					</Button>
				</>
			)}
		</AppBarLayout>
	);
};

export default JobsPage;
