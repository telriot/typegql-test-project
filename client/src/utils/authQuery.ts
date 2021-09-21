import client from 'apollo-client';
import { GetServerSidePropsContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

const authQuery = async (
	ctx: GetServerSidePropsContext,
	query: DocumentNode | TypedDocumentNode
): Promise<
	ApolloQueryResult<{
		[key: string]: any;
	}>
> =>
	await client.query({
		query,
		context: {
			headers: {
				cookie: ctx.req.headers.cookie
			}
		}
	});

export default authQuery;
