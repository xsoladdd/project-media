import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** Crypto protocol for IDS */
  EncryptedID: any;
};



export type InputLogin = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type InputNewPost = {
  title: Scalars['String'];
  content: Scalars['String'];
};

export type InputRegistration = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type InputSetupProfile = {
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  display_image?: Maybe<Scalars['String']>;
  birthday: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: ReturnRegisterLogin;
  setupProfile: ReturnStructure;
  newPost: ReturnStructure;
};


export type MutationRegisterUserArgs = {
  input: InputRegistration;
};


export type MutationSetupProfileArgs = {
  input?: Maybe<InputSetupProfile>;
};


export type MutationNewPostArgs = {
  input: InputNewPost;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['EncryptedID'];
  title: Scalars['String'];
  content: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['EncryptedID'];
  first_name: Scalars['String'];
  middle_name?: Maybe<Scalars['String']>;
  last_name: Scalars['String'];
  birthday: Scalars['DateTime'];
  nickname: Scalars['String'];
  display_image: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  login: ReturnRegisterLogin;
  ping: Scalars['String'];
  allPost: ReturnPosts;
};


export type QueryLoginArgs = {
  input: InputLogin;
};


export type QueryAllPostArgs = {
  limit?: Maybe<Scalars['Float']>;
};

export type ReturnPosts = {
  __typename?: 'ReturnPosts';
  message: Scalars['String'];
  status: Scalars['Int'];
  posts: Array<Post>;
};

export type ReturnRegisterLogin = {
  __typename?: 'ReturnRegisterLogin';
  message: Scalars['String'];
  status: Scalars['Int'];
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ReturnStructure = {
  __typename?: 'ReturnStructure';
  message: Scalars['String'];
  status: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['EncryptedID'];
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  mobile_number?: Maybe<Scalars['String']>;
  has_profile: Scalars['Int'];
  profile: Profile;
};

export type RegisterUserMutationVariables = Exact<{
  registerUserInput: InputRegistration;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'ReturnRegisterLogin', message: string, status: number, token?: Maybe<string>, user?: Maybe<{ __typename?: 'User', email: string, id: any }> } };

export type LoginQueryVariables = Exact<{
  loginInput: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'ReturnRegisterLogin', message: string, status: number, token?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, has_profile: number }> } };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', ping: string };


export const RegisterUserDocument = gql`
    mutation RegisterUser($registerUserInput: InputRegistration!) {
  registerUser(input: $registerUserInput) {
    message
    status
    token
    user {
      email
      id
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      registerUserInput: // value for 'registerUserInput'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginDocument = gql`
    query Login($loginInput: InputLogin!) {
  login(input: $loginInput) {
    message
    status
    token
    user {
      id
      email
      username
      mobile_number
      has_profile
    }
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const PingDocument = gql`
    query Ping {
  ping
}
    `;

/**
 * __usePingQuery__
 *
 * To run a query within a React component, call `usePingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePingQuery({
 *   variables: {
 *   },
 * });
 */
export function usePingQuery(baseOptions?: Apollo.QueryHookOptions<PingQuery, PingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PingQuery, PingQueryVariables>(PingDocument, options);
      }
export function usePingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PingQuery, PingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PingQuery, PingQueryVariables>(PingDocument, options);
        }
export type PingQueryHookResult = ReturnType<typeof usePingQuery>;
export type PingLazyQueryHookResult = ReturnType<typeof usePingLazyQuery>;
export type PingQueryResult = Apollo.QueryResult<PingQuery, PingQueryVariables>;