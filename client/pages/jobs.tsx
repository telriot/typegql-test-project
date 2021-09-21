import { FC, useEffect, useState, MouseEvent } from 'react';
import { GetServerSideProps } from 'next';
import { AppBarLayout } from 'src/layouts/AppBarLayout';
import getIsAuth from 'src/utils/getIsAuth';
import authRedirect from 'src/utils/authRedirect';
import { useDebounce } from 'use-debounce';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import CheckIcon from '@mui/icons-material/Check';
import {
	Job,
	useGetJobsLazyQuery,
	useDeleteJobMutation,
	useUpdateJobMutation,
	User
} from 'src/graphql';
import {
	Box,
	Button,
	CircularProgress,
	List,
	ListItem,
	ListItemButton,
	IconButton,
	ListItemText,
	Typography,
	TextField
} from '@mui/material';

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

export const JobItem: FC<{ job: Job }> = ({ job }) => {
	const [isUpdateMode, setIsUpdateMode] = useState(false);
	const [nameUpdate, setNameUpdate] = useState('');
	const [companyUpdate, setCompanyUpdate] = useState('');
	const [updateJob, { loading: isUpdating }] = useUpdateJobMutation({
		update(cache, { data }) {
			cache.modify({
				id: cache.identify(data!.updateJob),
				fields: {
					name() {
						return data!.updateJob.name;
					},
					companyName() {
						return data!.updateJob.companyName;
					}
				}
			});
		}
	});
	const [deleteJob, { loading: isDeleting }] = useDeleteJobMutation({
		update(cache, { data }) {
			cache.modify({
				fields: {
					getJobs(existingJobRefs, { readField }) {
						return existingJobRefs.filter((elRef: any) => {
							return data?.deleteJob._id !== readField('_id', elRef);
						});
					}
				}
			});
		}
	});
	const handleDelete = async (_: MouseEvent, deleteJobId: string) => {
		await deleteJob({ variables: { deleteJobId } });
	};
	const handleUpdate = async (_: MouseEvent, id: string) => {
		await updateJob({
			variables: {
				updateJobId: id,
				updateJobName: nameUpdate,
				updateJobCompanyName: companyUpdate
			}
		});
		setCompanyUpdate('');
		setNameUpdate('');
	};

	return (
		<ListItem disablePadding key={job._id}>
			<IconButton
				disabled={isDeleting}
				onClick={(e) => handleDelete(e, job._id)}>
				{isDeleting ? <CircularProgress size={12} /> : <DeleteIcon />}
			</IconButton>
			<IconButton
				disabled={isUpdating}
				onClick={() => setIsUpdateMode((prev) => !prev)}>
				{isUpdating ? <CircularProgress size={12} /> : <UpdateIcon />}
			</IconButton>
			<ListItemButton>
				<ListItemText
					primary={`${job.name} - ${job._id}`}
					secondary={job.companyName}
				/>
			</ListItemButton>
			{isUpdateMode && (
				<Box display='flex'>
					<TextField
						placeholder='Name update'
						value={nameUpdate}
						onChange={(e) => setNameUpdate(e.target.value)}
						sx={{ marginRight: '2rem' }}
					/>
					<TextField
						placeholder='Company update'
						value={companyUpdate}
						onChange={(e) => setCompanyUpdate(e.target.value)}
					/>
					<IconButton
						disabled={isUpdating}
						onClick={(e) => handleUpdate(e, job._id)}>
						<CheckIcon />
					</IconButton>
				</Box>
			)}
		</ListItem>
	);
};
