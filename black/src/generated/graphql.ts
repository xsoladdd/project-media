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
  /** Scalar for files uploaded in Amazon S3 */
  S3File: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};



export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type InputCheckUnique = {
  username?: Maybe<Scalars['String']>;
  mobile_number?: Maybe<Scalars['String']>;
};

export type InputFetchPost = {
  offset: Scalars['Float'];
  limit: Scalars['Float'];
  username?: Maybe<Scalars['String']>;
};

export type InputFileUpload = {
  file: Scalars['Upload'];
};

export type InputNewPost = {
  content: Scalars['String'];
};

export type InputSetupProfile = {
  mobileNumber: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  display_image?: Maybe<Scalars['Upload']>;
  banner_image?: Maybe<Scalars['Upload']>;
  birthday: Scalars['DateTime'];
};

export type LoginRegistrationInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: ReturnRegisterLogin;
  loginNormal: ReturnRegisterLogin;
  oauthHandler: ReturnRegisterLogin;
  newPost: ReturnNewPost;
  TestFileUpload: ReturnStructure;
  setupProfile: ReturnUserWithProfile;
};


export type MutationRegisterUserArgs = {
  input: LoginRegistrationInput;
};


export type MutationLoginNormalArgs = {
  input: LoginRegistrationInput;
};


export type MutationOauthHandlerArgs = {
  email: Scalars['String'];
};


export type MutationNewPostArgs = {
  input: InputNewPost;
};


export type MutationTestFileUploadArgs = {
  input: InputFileUpload;
};


export type MutationSetupProfileArgs = {
  input: InputSetupProfile;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['EncryptedID'];
  content: Scalars['String'];
  user?: Maybe<User>;
  UpdatedAt: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['EncryptedID'];
  first_name: Scalars['String'];
  middle_name?: Maybe<Scalars['String']>;
  last_name: Scalars['String'];
  birthday: Scalars['DateTime'];
  nickname?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  banner_image?: Maybe<Scalars['S3File']>;
  display_image?: Maybe<Scalars['S3File']>;
};

export type Query = {
  __typename?: 'Query';
  me: ReturnUserWithProfile;
  fetchPost: ReturnPosts;
  getEncryptedValue: Scalars['String'];
  getDecryptedValue: Scalars['String'];
  ping: Scalars['String'];
  checkUnique: Scalars['Boolean'];
  getProfile: ReturnUserWithProfile;
};


export type QueryFetchPostArgs = {
  input?: Maybe<InputFetchPost>;
};


export type QueryGetEncryptedValueArgs = {
  id: Scalars['String'];
};


export type QueryGetDecryptedValueArgs = {
  id: Scalars['String'];
};


export type QueryCheckUniqueArgs = {
  input?: Maybe<InputCheckUnique>;
};


export type QueryGetProfileArgs = {
  username: Scalars['String'];
};

export type ReturnNewPost = {
  __typename?: 'ReturnNewPost';
  status: Scalars['Int'];
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type ReturnPosts = {
  __typename?: 'ReturnPosts';
  status: Scalars['Int'];
  errors?: Maybe<Array<FieldError>>;
  posts: Array<Post>;
  has_more: Scalars['Boolean'];
};

export type ReturnRegisterLogin = {
  __typename?: 'ReturnRegisterLogin';
  status: Scalars['Int'];
  errors?: Maybe<Array<FieldError>>;
  token?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ReturnStructure = {
  __typename?: 'ReturnStructure';
  status: Scalars['Int'];
  errors?: Maybe<Array<FieldError>>;
};

export type ReturnUserWithProfile = {
  __typename?: 'ReturnUserWithProfile';
  status: Scalars['Int'];
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};



export type User = {
  __typename?: 'User';
  id: Scalars['EncryptedID'];
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  mobile_number?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
};

export type FieldErrorsFragment = { __typename: 'FieldError', field: string, message: string };

export type PostFragment = { __typename?: 'Post', id: any, content: string, UpdatedAt: string, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> }> }> };

export type ProfileFragment = { __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> };

export type UserFragment = { __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> }> };

export type LoginNormalMutationVariables = Exact<{
  input: LoginRegistrationInput;
}>;


export type LoginNormalMutation = { __typename?: 'Mutation', loginNormal: { __typename?: 'ReturnRegisterLogin', status: number, token?: Maybe<string>, refresh_token?: Maybe<string>, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> }> }> } };

export type NewPostMutationVariables = Exact<{
  input: InputNewPost;
}>;


export type NewPostMutation = { __typename?: 'Mutation', newPost: { __typename?: 'ReturnNewPost', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, post?: Maybe<{ __typename?: 'Post', id: any, content: string, UpdatedAt: string, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> }> }> }> } };

export type RegisterUserMutationVariables = Exact<{
  input: LoginRegistrationInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'ReturnRegisterLogin', status: number, token?: Maybe<string>, refresh_token?: Maybe<string>, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> }> }> } };

export type SetupProfileMutationVariables = Exact<{
  input: InputSetupProfile;
}>;


export type SetupProfileMutation = { __typename?: 'Mutation', setupProfile: { __typename?: 'ReturnUserWithProfile', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> }> }> } };

export type CheckUniqueQueryVariables = Exact<{
  input: InputCheckUnique;
}>;


export type CheckUniqueQuery = { __typename?: 'Query', checkUnique: boolean };

export type FetchPostQueryVariables = Exact<{
  input: InputFetchPost;
}>;


export type FetchPostQuery = { __typename?: 'Query', fetchPost: { __typename?: 'ReturnPosts', status: number, has_more: boolean, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, posts: Array<{ __typename?: 'Post', id: any, content: string, UpdatedAt: string, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> }> }> }> } };

export type GetProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'ReturnUserWithProfile', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> }> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'ReturnUserWithProfile', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> }> }> } };

export type OAuthHandlerMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type OAuthHandlerMutation = { __typename?: 'Mutation', oauthHandler: { __typename?: 'ReturnRegisterLogin', status: number, token?: Maybe<string>, refresh_token?: Maybe<string>, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string> }> }> } };

export const FieldErrorsFragmentDoc = gql`
    fragment fieldErrors on FieldError {
  field
  message
  __typename
}
    `;
export const ProfileFragmentDoc = gql`
    fragment profile on Profile {
  id
  first_name
  middle_name
  last_name
  birthday
  nickname
  nickname
  display_image
  banner_image
  bio
  __typename
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  id
  email
  username
  mobile_number
  profile {
    ...profile
  }
  __typename
}
    ${ProfileFragmentDoc}`;
export const PostFragmentDoc = gql`
    fragment post on Post {
  id
  content
  user {
    ...user
  }
  UpdatedAt
}
    ${UserFragmentDoc}`;
export const LoginNormalDocument = gql`
    mutation LoginNormal($input: LoginRegistrationInput!) {
  loginNormal(input: $input) {
    status
    errors {
      ...fieldErrors
    }
    user {
      ...user
    }
    token
    refresh_token
  }
}
    ${FieldErrorsFragmentDoc}
${UserFragmentDoc}`;
export type LoginNormalMutationFn = Apollo.MutationFunction<LoginNormalMutation, LoginNormalMutationVariables>;

/**
 * __useLoginNormalMutation__
 *
 * To run a mutation, you first call `useLoginNormalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginNormalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginNormalMutation, { data, loading, error }] = useLoginNormalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginNormalMutation(baseOptions?: Apollo.MutationHookOptions<LoginNormalMutation, LoginNormalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginNormalMutation, LoginNormalMutationVariables>(LoginNormalDocument, options);
      }
export type LoginNormalMutationHookResult = ReturnType<typeof useLoginNormalMutation>;
export type LoginNormalMutationResult = Apollo.MutationResult<LoginNormalMutation>;
export type LoginNormalMutationOptions = Apollo.BaseMutationOptions<LoginNormalMutation, LoginNormalMutationVariables>;
export const NewPostDocument = gql`
    mutation NewPost($input: InputNewPost!) {
  newPost(input: $input) {
    status
    errors {
      ...fieldErrors
    }
    post {
      ...post
    }
  }
}
    ${FieldErrorsFragmentDoc}
${PostFragmentDoc}`;
export type NewPostMutationFn = Apollo.MutationFunction<NewPostMutation, NewPostMutationVariables>;

/**
 * __useNewPostMutation__
 *
 * To run a mutation, you first call `useNewPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPostMutation, { data, loading, error }] = useNewPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewPostMutation(baseOptions?: Apollo.MutationHookOptions<NewPostMutation, NewPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPostMutation, NewPostMutationVariables>(NewPostDocument, options);
      }
export type NewPostMutationHookResult = ReturnType<typeof useNewPostMutation>;
export type NewPostMutationResult = Apollo.MutationResult<NewPostMutation>;
export type NewPostMutationOptions = Apollo.BaseMutationOptions<NewPostMutation, NewPostMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: LoginRegistrationInput!) {
  registerUser(input: $input) {
    status
    errors {
      ...fieldErrors
    }
    token
    refresh_token
    user {
      ...user
    }
  }
}
    ${FieldErrorsFragmentDoc}
${UserFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const SetupProfileDocument = gql`
    mutation SetupProfile($input: InputSetupProfile!) {
  setupProfile(input: $input) {
    status
    errors {
      ...fieldErrors
    }
    user {
      ...user
    }
  }
}
    ${FieldErrorsFragmentDoc}
${UserFragmentDoc}`;
export type SetupProfileMutationFn = Apollo.MutationFunction<SetupProfileMutation, SetupProfileMutationVariables>;

/**
 * __useSetupProfileMutation__
 *
 * To run a mutation, you first call `useSetupProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetupProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupProfileMutation, { data, loading, error }] = useSetupProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetupProfileMutation(baseOptions?: Apollo.MutationHookOptions<SetupProfileMutation, SetupProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetupProfileMutation, SetupProfileMutationVariables>(SetupProfileDocument, options);
      }
export type SetupProfileMutationHookResult = ReturnType<typeof useSetupProfileMutation>;
export type SetupProfileMutationResult = Apollo.MutationResult<SetupProfileMutation>;
export type SetupProfileMutationOptions = Apollo.BaseMutationOptions<SetupProfileMutation, SetupProfileMutationVariables>;
export const CheckUniqueDocument = gql`
    query CheckUnique($input: InputCheckUnique!) {
  checkUnique(input: $input)
}
    `;

/**
 * __useCheckUniqueQuery__
 *
 * To run a query within a React component, call `useCheckUniqueQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUniqueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUniqueQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckUniqueQuery(baseOptions: Apollo.QueryHookOptions<CheckUniqueQuery, CheckUniqueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUniqueQuery, CheckUniqueQueryVariables>(CheckUniqueDocument, options);
      }
export function useCheckUniqueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUniqueQuery, CheckUniqueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUniqueQuery, CheckUniqueQueryVariables>(CheckUniqueDocument, options);
        }
export type CheckUniqueQueryHookResult = ReturnType<typeof useCheckUniqueQuery>;
export type CheckUniqueLazyQueryHookResult = ReturnType<typeof useCheckUniqueLazyQuery>;
export type CheckUniqueQueryResult = Apollo.QueryResult<CheckUniqueQuery, CheckUniqueQueryVariables>;
export const FetchPostDocument = gql`
    query FetchPost($input: InputFetchPost!) {
  fetchPost(input: $input) {
    status
    has_more
    errors {
      ...fieldErrors
    }
    posts {
      ...post
    }
  }
}
    ${FieldErrorsFragmentDoc}
${PostFragmentDoc}`;

/**
 * __useFetchPostQuery__
 *
 * To run a query within a React component, call `useFetchPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPostQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchPostQuery(baseOptions: Apollo.QueryHookOptions<FetchPostQuery, FetchPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPostQuery, FetchPostQueryVariables>(FetchPostDocument, options);
      }
export function useFetchPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPostQuery, FetchPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPostQuery, FetchPostQueryVariables>(FetchPostDocument, options);
        }
export type FetchPostQueryHookResult = ReturnType<typeof useFetchPostQuery>;
export type FetchPostLazyQueryHookResult = ReturnType<typeof useFetchPostLazyQuery>;
export type FetchPostQueryResult = Apollo.QueryResult<FetchPostQuery, FetchPostQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($username: String!) {
  getProfile(username: $username) {
    status
    errors {
      ...fieldErrors
    }
    user {
      ...user
    }
  }
}
    ${FieldErrorsFragmentDoc}
${UserFragmentDoc}`;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    status
    errors {
      ...fieldErrors
    }
    user {
      ...user
    }
  }
}
    ${FieldErrorsFragmentDoc}
${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const OAuthHandlerDocument = gql`
    mutation OAuthHandler($email: String!) {
  oauthHandler(email: $email) {
    status
    token
    refresh_token
    errors {
      ...fieldErrors
    }
    user {
      ...user
    }
  }
}
    ${FieldErrorsFragmentDoc}
${UserFragmentDoc}`;
export type OAuthHandlerMutationFn = Apollo.MutationFunction<OAuthHandlerMutation, OAuthHandlerMutationVariables>;

/**
 * __useOAuthHandlerMutation__
 *
 * To run a mutation, you first call `useOAuthHandlerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOAuthHandlerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oAuthHandlerMutation, { data, loading, error }] = useOAuthHandlerMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useOAuthHandlerMutation(baseOptions?: Apollo.MutationHookOptions<OAuthHandlerMutation, OAuthHandlerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OAuthHandlerMutation, OAuthHandlerMutationVariables>(OAuthHandlerDocument, options);
      }
export type OAuthHandlerMutationHookResult = ReturnType<typeof useOAuthHandlerMutation>;
export type OAuthHandlerMutationResult = Apollo.MutationResult<OAuthHandlerMutation>;
export type OAuthHandlerMutationOptions = Apollo.BaseMutationOptions<OAuthHandlerMutation, OAuthHandlerMutationVariables>;