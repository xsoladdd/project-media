export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
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
  username: Scalars['String'];
  mobile_number: Scalars['String'];
  has_profile: Scalars['Int'];
  profile: Profile;
};
