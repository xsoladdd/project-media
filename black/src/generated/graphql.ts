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



export type InputCheckUnique = {
  username?: Maybe<Scalars['String']>;
  mobile_number?: Maybe<Scalars['String']>;
};

export type InputGetFreshToken = {
  refresh_token: Scalars['String'];
};

export type InputLoginNormal = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type InputLoginSocialmedia = {
  email: Scalars['String'];
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
  setupProfile: ReturnMeAndProfileUpdate;
  oauthHandler: ReturnRegisterLogin;
  newPost: ReturnStructure;
  getFreshToken: ReturnFreshToken;
};


export type MutationRegisterUserArgs = {
  input: InputRegistration;
};


export type MutationSetupProfileArgs = {
  input?: Maybe<InputSetupProfile>;
};


export type MutationOauthHandlerArgs = {
  input: InputLoginSocialmedia;
};


export type MutationNewPostArgs = {
  input: InputNewPost;
};


export type MutationGetFreshTokenArgs = {
  input: InputGetFreshToken;
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
  nickname?: Maybe<Scalars['String']>;
  display_image?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  loginNormal: ReturnRegisterLogin;
  checkUnique: ReturnStructure;
  ping: Scalars['String'];
  me: ReturnMeAndProfileUpdate;
  allPost: ReturnPosts;
};


export type QueryLoginNormalArgs = {
  input: InputLoginNormal;
};


export type QueryCheckUniqueArgs = {
  input?: Maybe<InputCheckUnique>;
};


export type QueryAllPostArgs = {
  limit?: Maybe<Scalars['Float']>;
};

export type ReturnFreshToken = {
  __typename?: 'ReturnFreshToken';
  message: Scalars['String'];
  status: Scalars['Int'];
  fresh_token?: Maybe<Scalars['String']>;
};

export type ReturnMeAndProfileUpdate = {
  __typename?: 'ReturnMeAndProfileUpdate';
  message: Scalars['String'];
  status: Scalars['Int'];
  user?: Maybe<User>;
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
  refresh_token?: Maybe<Scalars['String']>;
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
  profile?: Maybe<Profile>;
};

export type GetFreshTokenMutationVariables = Exact<{
  getFreshTokenInput: InputGetFreshToken;
}>;


export type GetFreshTokenMutation = { __typename?: 'Mutation', getFreshToken: { __typename?: 'ReturnFreshToken', message: string, status: number, fresh_token?: Maybe<string> } };

export type RegisterUserMutationVariables = Exact<{
  registerUserInput: InputRegistration;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'ReturnRegisterLogin', message: string, status: number, token?: Maybe<string>, refresh_token?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: any }> } };

export type SetupProfileMutationVariables = Exact<{
  setupProfileInput?: Maybe<InputSetupProfile>;
}>;


export type SetupProfileMutation = { __typename?: 'Mutation', setupProfile: { __typename?: 'ReturnMeAndProfileUpdate', message: string, status: number, user?: Maybe<{ __typename?: 'User', mobile_number?: Maybe<string>, username?: Maybe<string>, email: string, id: any, profile?: Maybe<{ __typename?: 'Profile', birthday: any, last_name: string, middle_name?: Maybe<string>, first_name: string, id: any, display_image?: Maybe<string>, nickname?: Maybe<string> }> }> } };

export type CheckUniqueQueryVariables = Exact<{
  checkUniqueInput?: Maybe<InputCheckUnique>;
}>;


export type CheckUniqueQuery = { __typename?: 'Query', checkUnique: { __typename?: 'ReturnStructure', message: string, status: number } };

export type LoginNormalQueryVariables = Exact<{
  loginNormalInput: InputLoginNormal;
}>;


export type LoginNormalQuery = { __typename?: 'Query', loginNormal: { __typename?: 'ReturnRegisterLogin', message: string, status: number, token?: Maybe<string>, refresh_token?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: any }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'ReturnMeAndProfileUpdate', status: number, message: string, user?: Maybe<{ __typename?: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename?: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<string> }> }> } };

export type OauthHandlerMutationVariables = Exact<{
  oauthHandlerInput: InputLoginSocialmedia;
}>;


export type OauthHandlerMutation = { __typename?: 'Mutation', oauthHandler: { __typename?: 'ReturnRegisterLogin', message: string, status: number, token?: Maybe<string>, refresh_token?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: any }> } };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', ping: string };


export const GetFreshTokenDocument = gql`
    mutation getFreshToken($getFreshTokenInput: InputGetFreshToken!) {
  getFreshToken(input: $getFreshTokenInput) {
    message
    status
    fresh_token
  }
}
    `;
export type GetFreshTokenMutationFn = Apollo.MutationFunction<GetFreshTokenMutation, GetFreshTokenMutationVariables>;

/**
 * __useGetFreshTokenMutation__
 *
 * To run a mutation, you first call `useGetFreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetFreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getFreshTokenMutation, { data, loading, error }] = useGetFreshTokenMutation({
 *   variables: {
 *      getFreshTokenInput: // value for 'getFreshTokenInput'
 *   },
 * });
 */
export function useGetFreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<GetFreshTokenMutation, GetFreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetFreshTokenMutation, GetFreshTokenMutationVariables>(GetFreshTokenDocument, options);
      }
export type GetFreshTokenMutationHookResult = ReturnType<typeof useGetFreshTokenMutation>;
export type GetFreshTokenMutationResult = Apollo.MutationResult<GetFreshTokenMutation>;
export type GetFreshTokenMutationOptions = Apollo.BaseMutationOptions<GetFreshTokenMutation, GetFreshTokenMutationVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($registerUserInput: InputRegistration!) {
  registerUser(input: $registerUserInput) {
    message
    status
    token
    refresh_token
    user {
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
export const SetupProfileDocument = gql`
    mutation setupProfile($setupProfileInput: InputSetupProfile) {
  setupProfile(input: $setupProfileInput) {
    message
    status
    user {
      profile {
        birthday
        last_name
        middle_name
        first_name
        id
        display_image
        nickname
      }
      mobile_number
      username
      email
      id
    }
  }
}
    `;
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
 *      setupProfileInput: // value for 'setupProfileInput'
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
    query checkUnique($checkUniqueInput: InputCheckUnique) {
  checkUnique(input: $checkUniqueInput) {
    message
    status
  }
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
 *      checkUniqueInput: // value for 'checkUniqueInput'
 *   },
 * });
 */
export function useCheckUniqueQuery(baseOptions?: Apollo.QueryHookOptions<CheckUniqueQuery, CheckUniqueQueryVariables>) {
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
export const LoginNormalDocument = gql`
    query loginNormal($loginNormalInput: InputLoginNormal!) {
  loginNormal(input: $loginNormalInput) {
    message
    status
    token
    refresh_token
    user {
      id
    }
  }
}
    `;

/**
 * __useLoginNormalQuery__
 *
 * To run a query within a React component, call `useLoginNormalQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginNormalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginNormalQuery({
 *   variables: {
 *      loginNormalInput: // value for 'loginNormalInput'
 *   },
 * });
 */
export function useLoginNormalQuery(baseOptions: Apollo.QueryHookOptions<LoginNormalQuery, LoginNormalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginNormalQuery, LoginNormalQueryVariables>(LoginNormalDocument, options);
      }
export function useLoginNormalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginNormalQuery, LoginNormalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginNormalQuery, LoginNormalQueryVariables>(LoginNormalDocument, options);
        }
export type LoginNormalQueryHookResult = ReturnType<typeof useLoginNormalQuery>;
export type LoginNormalLazyQueryHookResult = ReturnType<typeof useLoginNormalLazyQuery>;
export type LoginNormalQueryResult = Apollo.QueryResult<LoginNormalQuery, LoginNormalQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    user {
      id
      email
      username
      mobile_number
      profile {
        id
        first_name
        middle_name
        last_name
        birthday
        nickname
        display_image
      }
    }
    status
    message
  }
}
    `;

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
export const OauthHandlerDocument = gql`
    mutation oauthHandler($oauthHandlerInput: InputLoginSocialmedia!) {
  oauthHandler(input: $oauthHandlerInput) {
    message
    status
    token
    refresh_token
    user {
      id
    }
  }
}
    `;
export type OauthHandlerMutationFn = Apollo.MutationFunction<OauthHandlerMutation, OauthHandlerMutationVariables>;

/**
 * __useOauthHandlerMutation__
 *
 * To run a mutation, you first call `useOauthHandlerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOauthHandlerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [oauthHandlerMutation, { data, loading, error }] = useOauthHandlerMutation({
 *   variables: {
 *      oauthHandlerInput: // value for 'oauthHandlerInput'
 *   },
 * });
 */
export function useOauthHandlerMutation(baseOptions?: Apollo.MutationHookOptions<OauthHandlerMutation, OauthHandlerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OauthHandlerMutation, OauthHandlerMutationVariables>(OauthHandlerDocument, options);
      }
export type OauthHandlerMutationHookResult = ReturnType<typeof useOauthHandlerMutation>;
export type OauthHandlerMutationResult = Apollo.MutationResult<OauthHandlerMutation>;
export type OauthHandlerMutationOptions = Apollo.BaseMutationOptions<OauthHandlerMutation, OauthHandlerMutationVariables>;
export const PingDocument = gql`
    query ping {
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