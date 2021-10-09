import { FC, useState, MouseEvent } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import CheckIcon from '@mui/icons-material/Check';
import {
	Job,
	useDeleteJobMutation,
	useUpdateJobMutation,
} from 'src/graphql';
import {
	Box,
	CircularProgress,
	ListItem,
	ListItemButton,
	IconButton,
	ListItemText,
	TextField
} from '@mui/material';

export interface JobItemProps {
  className?: string;
  job: Job
}
const JobItem: FC<JobItemProps> = ({ job }) => {
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

export default JobItem