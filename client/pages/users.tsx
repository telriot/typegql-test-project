import {FC} from 'react'
import { useGetUsersQuery } from 'src/graphql'

export interface UsersPageProps {
  className?: string;
}
const UsersPage : FC<UsersPageProps> = () => {
  const {data, loading, error} = useGetUsersQuery()
  console.log(data, loading, error)
    return (
        <div>
        </div>
    )
}

export default UsersPage