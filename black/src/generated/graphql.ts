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

export type CommentPost = {
  __typename?: 'CommentPost';
  id: Scalars['EncryptedID'];
  postId: Scalars['String'];
  commentId: Scalars['String'];
};

export type Comments = {
  __typename?: 'Comments';
  id: Scalars['EncryptedID'];
  content: Scalars['String'];
  UpdatedAt: Scalars['String'];
  user: User;
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

export type InputComment = {
  content: Scalars['String'];
  postId: Scalars['EncryptedID'];
};

export type InputFetchPost = {
  offset: Scalars['Float'];
  limit: Scalars['Float'];
  username?: Maybe<Scalars['String']>;
};

export type InputFileUpload = {
  file: Scalars['Upload'];
};

export type InputGetComments = {
  offset: Scalars['Float'];
  limit: Scalars['Float'];
  postId: Scalars['EncryptedID'];
};

export type InputNewPost = {
  content: Scalars['String'];
  media?: Maybe<Scalars['Upload']>;
};

export type InputProfile = {
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
};

export type InputUniqueData = {
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  mobileNumber: Scalars['String'];
  username: Scalars['String'];
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
  newPost: ReturnPost;
  likeUnlikePost: ReturnPost;
  TestFileUpload: ReturnStructure;
  setupProfile: ReturnUserWithProfile;
  updateProfile: ReturnUserWithProfile;
  uploadProfilePicture: ReturnUserWithProfile;
  uploadProfileBanner: ReturnUserWithProfile;
  addComment: ReturnComment;
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


export type MutationLikeUnlikePostArgs = {
  postId: Scalars['EncryptedID'];
};


export type MutationTestFileUploadArgs = {
  input: InputFileUpload;
};


export type MutationSetupProfileArgs = {
  input: InputUniqueData;
};


export type MutationUpdateProfileArgs = {
  input: InputProfile;
};


export type MutationUploadProfilePictureArgs = {
  profilePicture: Scalars['Upload'];
};


export type MutationUploadProfileBannerArgs = {
  profileBanner: Scalars['Upload'];
};


export type MutationAddCommentArgs = {
  input: InputComment;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['EncryptedID'];
  content: Scalars['String'];
  media?: Maybe<Scalars['S3File']>;
  user?: Maybe<User>;
  userId: Scalars['Int'];
  userConnection: Array<UserPostLike>;
  UpdatedAt: Scalars['String'];
  likes?: Maybe<Array<User>>;
  comments?: Maybe<Array<Comments>>;
  commentCount: Scalars['Int'];
  commentConnection: Array<CommentPost>;
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
  userId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  me: ReturnUserWithProfile;
  fetchPosts: ReturnPosts;
  fetchPost: ReturnPost;
  getEncryptedValue: Scalars['String'];
  getDecryptedValue: Scalars['String'];
  ping: Scalars['String'];
  checkUnique: Scalars['Boolean'];
  getProfile: ReturnUserWithProfile;
  getAllUsers: Array<User>;
  getComments: ReturnComments;
};


export type QueryFetchPostsArgs = {
  input?: Maybe<InputFetchPost>;
};


export type QueryFetchPostArgs = {
  postId: Scalars['EncryptedID'];
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


export type QueryGetCommentsArgs = {
  input: InputGetComments;
};

export type ReturnComment = {
  __typename?: 'ReturnComment';
  status: Scalars['Int'];
  errors?: Maybe<Array<FieldError>>;
  comment: Comments;
};

export type ReturnComments = {
  __typename?: 'ReturnComments';
  status: Scalars['Int'];
  errors?: Maybe<Array<FieldError>>;
  comments?: Maybe<Array<Comments>>;
  has_more: Scalars['Boolean'];
};

export type ReturnPost = {
  __typename?: 'ReturnPost';
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
  comments?: Maybe<Comments>;
};

export type UserPostLike = {
  __typename?: 'UserPostLike';
  id: Scalars['EncryptedID'];
};

export type CommentFragment = { __typename?: 'Comments', id: any, content: string, UpdatedAt: string, user: { __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> } };

export type FieldErrorsFragment = { __typename: 'FieldError', field: string, message: string };

export type PostFragment = { __typename?: 'Post', id: any, content: string, media?: Maybe<any>, commentCount: number, UpdatedAt: string, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }>, likes?: Maybe<Array<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }>> };

export type ProfileFragment = { __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number };

export type UserFragment = { __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> };

export type AddCommentMutationVariables = Exact<{
  input: InputComment;
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: { __typename?: 'ReturnComment', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, comment: { __typename?: 'Comments', id: any, content: string, UpdatedAt: string, user: { __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> } } } };

export type LikeUnlikePostMutationVariables = Exact<{
  postId: Scalars['EncryptedID'];
}>;


export type LikeUnlikePostMutation = { __typename?: 'Mutation', likeUnlikePost: { __typename?: 'ReturnPost', status: number, post?: Maybe<{ __typename?: 'Post', id: any, content: string, media?: Maybe<any>, commentCount: number, UpdatedAt: string, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }>, likes?: Maybe<Array<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }>> }>, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>> } };

export type LoginNormalMutationVariables = Exact<{
  input: LoginRegistrationInput;
}>;


export type LoginNormalMutation = { __typename?: 'Mutation', loginNormal: { __typename?: 'ReturnRegisterLogin', status: number, token?: Maybe<string>, refresh_token?: Maybe<string>, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }> } };

export type NewPostMutationVariables = Exact<{
  input: InputNewPost;
}>;


export type NewPostMutation = { __typename?: 'Mutation', newPost: { __typename?: 'ReturnPost', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, post?: Maybe<{ __typename?: 'Post', id: any, content: string, media?: Maybe<any>, commentCount: number, UpdatedAt: string, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }>, likes?: Maybe<Array<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }>> }> } };

export type RegisterUserMutationVariables = Exact<{
  input: LoginRegistrationInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'ReturnRegisterLogin', status: number, token?: Maybe<string>, refresh_token?: Maybe<string>, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }> } };

export type SetupProfileMutationVariables = Exact<{
  input: InputUniqueData;
}>;


export type SetupProfileMutation = { __typename?: 'Mutation', setupProfile: { __typename?: 'ReturnUserWithProfile', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }> } };

export type UpdateProfileMutationVariables = Exact<{
  input: InputProfile;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'ReturnUserWithProfile', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }> } };

export type UploadProfileBannerMutationVariables = Exact<{
  profileBanner: Scalars['Upload'];
}>;


export type UploadProfileBannerMutation = { __typename?: 'Mutation', uploadProfileBanner: { __typename?: 'ReturnUserWithProfile', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }> } };

export type UploadProfilePictureMutationVariables = Exact<{
  ProfilePicture: Scalars['Upload'];
}>;


export type UploadProfilePictureMutation = { __typename?: 'Mutation', uploadProfilePicture: { __typename?: 'ReturnUserWithProfile', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }> } };

export type CheckUniqueQueryVariables = Exact<{
  input: InputCheckUnique;
}>;


export type CheckUniqueQuery = { __typename?: 'Query', checkUnique: boolean };

export type FetchPostQueryVariables = Exact<{
  postId: Scalars['EncryptedID'];
}>;


export type FetchPostQuery = { __typename?: 'Query', fetchPost: { __typename?: 'ReturnPost', status: number, post?: Maybe<{ __typename?: 'Post', id: any, content: string, media?: Maybe<any>, commentCount: number, UpdatedAt: string, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }>, likes?: Maybe<Array<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }>> }>, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>> } };

export type FetchPostsQueryVariables = Exact<{
  input: InputFetchPost;
}>;


export type FetchPostsQuery = { __typename?: 'Query', fetchPosts: { __typename?: 'ReturnPosts', status: number, has_more: boolean, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, posts: Array<{ __typename?: 'Post', id: any, content: string, media?: Maybe<any>, commentCount: number, UpdatedAt: string, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }>, likes?: Maybe<Array<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }>> }> } };

export type GetCommentsQueryVariables = Exact<{
  input: InputGetComments;
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: { __typename?: 'ReturnComments', has_more: boolean, comments?: Maybe<Array<{ __typename?: 'Comments', id: any, content: string, UpdatedAt: string, user: { __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> } }>> } };

export type GetProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'ReturnUserWithProfile', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'ReturnUserWithProfile', status: number, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }> } };

export type OAuthHandlerMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type OAuthHandlerMutation = { __typename?: 'Mutation', oauthHandler: { __typename?: 'ReturnRegisterLogin', status: number, token?: Maybe<string>, refresh_token?: Maybe<string>, errors?: Maybe<Array<{ __typename: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename: 'User', id: any, email: string, username?: Maybe<string>, mobile_number?: Maybe<string>, profile?: Maybe<{ __typename: 'Profile', id: any, first_name: string, middle_name?: Maybe<string>, last_name: string, birthday: any, nickname?: Maybe<string>, display_image?: Maybe<any>, banner_image?: Maybe<any>, bio?: Maybe<string>, userId: number }> }> } };

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
  userId
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
export const CommentFragmentDoc = gql`
    fragment comment on Comments {
  id
  content
  UpdatedAt
  user {
    ...user
  }
}
    ${UserFragmentDoc}`;
export const FieldErrorsFragmentDoc = gql`
    fragment fieldErrors on FieldError {
  field
  message
  __typename
}
    `;
export const PostFragmentDoc = gql`
    fragment post on Post {
  id
  content
  media
  user {
    ...user
  }
  likes {
    ...user
  }
  commentCount
  UpdatedAt
}
    ${UserFragmentDoc}`;
export const AddCommentDocument = gql`
    mutation AddComment($input: InputComment!) {
  addComment(input: $input) {
    status
    errors {
      ...fieldErrors
    }
    comment {
      ...comment
    }
  }
}
    ${FieldErrorsFragmentDoc}
${CommentFragmentDoc}`;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const LikeUnlikePostDocument = gql`
    mutation LikeUnlikePost($postId: EncryptedID!) {
  likeUnlikePost(postId: $postId) {
    post {
      ...post
    }
    status
    errors {
      ...fieldErrors
    }
  }
}
    ${PostFragmentDoc}
${FieldErrorsFragmentDoc}`;
export type LikeUnlikePostMutationFn = Apollo.MutationFunction<LikeUnlikePostMutation, LikeUnlikePostMutationVariables>;

/**
 * __useLikeUnlikePostMutation__
 *
 * To run a mutation, you first call `useLikeUnlikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeUnlikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeUnlikePostMutation, { data, loading, error }] = useLikeUnlikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikeUnlikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikeUnlikePostMutation, LikeUnlikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeUnlikePostMutation, LikeUnlikePostMutationVariables>(LikeUnlikePostDocument, options);
      }
export type LikeUnlikePostMutationHookResult = ReturnType<typeof useLikeUnlikePostMutation>;
export type LikeUnlikePostMutationResult = Apollo.MutationResult<LikeUnlikePostMutation>;
export type LikeUnlikePostMutationOptions = Apollo.BaseMutationOptions<LikeUnlikePostMutation, LikeUnlikePostMutationVariables>;
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
    mutation SetupProfile($input: InputUniqueData!) {
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
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: InputProfile!) {
  updateProfile(input: $input) {
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
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UploadProfileBannerDocument = gql`
    mutation UploadProfileBanner($profileBanner: Upload!) {
  uploadProfileBanner(profileBanner: $profileBanner) {
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
export type UploadProfileBannerMutationFn = Apollo.MutationFunction<UploadProfileBannerMutation, UploadProfileBannerMutationVariables>;

/**
 * __useUploadProfileBannerMutation__
 *
 * To run a mutation, you first call `useUploadProfileBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProfileBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProfileBannerMutation, { data, loading, error }] = useUploadProfileBannerMutation({
 *   variables: {
 *      profileBanner: // value for 'profileBanner'
 *   },
 * });
 */
export function useUploadProfileBannerMutation(baseOptions?: Apollo.MutationHookOptions<UploadProfileBannerMutation, UploadProfileBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadProfileBannerMutation, UploadProfileBannerMutationVariables>(UploadProfileBannerDocument, options);
      }
export type UploadProfileBannerMutationHookResult = ReturnType<typeof useUploadProfileBannerMutation>;
export type UploadProfileBannerMutationResult = Apollo.MutationResult<UploadProfileBannerMutation>;
export type UploadProfileBannerMutationOptions = Apollo.BaseMutationOptions<UploadProfileBannerMutation, UploadProfileBannerMutationVariables>;
export const UploadProfilePictureDocument = gql`
    mutation UploadProfilePicture($ProfilePicture: Upload!) {
  uploadProfilePicture(profilePicture: $ProfilePicture) {
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
export type UploadProfilePictureMutationFn = Apollo.MutationFunction<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>;

/**
 * __useUploadProfilePictureMutation__
 *
 * To run a mutation, you first call `useUploadProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProfilePictureMutation, { data, loading, error }] = useUploadProfilePictureMutation({
 *   variables: {
 *      ProfilePicture: // value for 'ProfilePicture'
 *   },
 * });
 */
export function useUploadProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>(UploadProfilePictureDocument, options);
      }
export type UploadProfilePictureMutationHookResult = ReturnType<typeof useUploadProfilePictureMutation>;
export type UploadProfilePictureMutationResult = Apollo.MutationResult<UploadProfilePictureMutation>;
export type UploadProfilePictureMutationOptions = Apollo.BaseMutationOptions<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>;
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
    query FetchPost($postId: EncryptedID!) {
  fetchPost(postId: $postId) {
    status
    post {
      ...post
    }
    errors {
      ...fieldErrors
    }
  }
}
    ${PostFragmentDoc}
${FieldErrorsFragmentDoc}`;

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
 *      postId: // value for 'postId'
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
export const FetchPostsDocument = gql`
    query fetchPosts($input: InputFetchPost!) {
  fetchPosts(input: $input) {
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
 * __useFetchPostsQuery__
 *
 * To run a query within a React component, call `useFetchPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPostsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchPostsQuery(baseOptions: Apollo.QueryHookOptions<FetchPostsQuery, FetchPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPostsQuery, FetchPostsQueryVariables>(FetchPostsDocument, options);
      }
export function useFetchPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPostsQuery, FetchPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPostsQuery, FetchPostsQueryVariables>(FetchPostsDocument, options);
        }
export type FetchPostsQueryHookResult = ReturnType<typeof useFetchPostsQuery>;
export type FetchPostsLazyQueryHookResult = ReturnType<typeof useFetchPostsLazyQuery>;
export type FetchPostsQueryResult = Apollo.QueryResult<FetchPostsQuery, FetchPostsQueryVariables>;
export const GetCommentsDocument = gql`
    query GetComments($input: InputGetComments!) {
  getComments(input: $input) {
    has_more
    comments {
      ...comment
    }
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
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