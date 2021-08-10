interface Response {}

interface Extensions {
  code: string;
}

interface Error {
  message: string;
  extensions: Extensions;
}

interface Result {
  errors: Error[];
}

interface NetworkError {
  name: string;
  response: Response;
  statusCode: number;
  result: Result;
}

export interface CustomApolloError {
  graphQLErrors: any[];
  clientErrors: any[];
  networkError: NetworkError;
  message: string;
}
