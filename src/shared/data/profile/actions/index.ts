import { asyncCatch as __, makeRequest } from "shared/utils";
import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  ProfileType,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS
} from "../constants";

const PROFILE_FRAGMENT = `
  fragment profile on User {
    avatar
    lastName
    firstName
  }
`;

export interface UpdateProfileRequest {
  type: typeof UPDATE_PROFILE_REQUEST;
}

export interface UpdateProfileSuccess {
  type: typeof UPDATE_PROFILE_SUCCESS;
  profile: ProfileType;
}

export interface UpdateProfileFailure {
  type: typeof UPDATE_PROFILE_FAILURE;
  errors: any;
}

export interface FetchProfileRequest {
  type: typeof FETCH_PROFILE_REQUEST;
}

export interface FetchProfileSuccess {
  type: typeof FETCH_PROFILE_SUCCESS;
  profile: ProfileType;
}

export interface FetchProfileFailure {
  type: typeof FETCH_PROFILE_FAILURE;
  errors: any;
}

export type Actions =
  | FetchProfileRequest
  | FetchProfileSuccess
  | FetchProfileFailure
  | UpdateProfileRequest
  | UpdateProfileSuccess
  | UpdateProfileFailure;

export const updateProfileRequest = (): UpdateProfileRequest => ({
  type: UPDATE_PROFILE_REQUEST
});

export const updateProfileSuccess = (
  profile: ProfileType
): UpdateProfileSuccess => ({
  type: UPDATE_PROFILE_SUCCESS,
  profile
});

export const updateProfileFailure = (errors: any): UpdateProfileFailure => ({
  type: UPDATE_PROFILE_FAILURE,
  errors
});

export const fetchProfileRequest = (): FetchProfileRequest => ({
  type: FETCH_PROFILE_REQUEST
});

export const fetchProfileSuccess = (
  profile: ProfileType
): FetchProfileSuccess => ({
  type: FETCH_PROFILE_SUCCESS,
  profile
});

export const fetchProfileFailure = (errors: any): FetchProfileFailure => ({
  type: FETCH_PROFILE_FAILURE,
  errors
});

export const fetchProfile = () => async (dispatch: any) => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(fetchProfileRequest());
  const query = `
    query getProfile {
      user {
        ...profile
      }
    }
    ${PROFILE_FRAGMENT}
  `;
  const [data, errors] = await __(
    makeRequest(
      JSON.stringify({
        query: query
      })
    )
  );
  if (errors) {
    return dispatch(fetchProfileFailure(errors));
  }
  // Second dispatch: return results.
  return dispatch(fetchProfileSuccess(data.user));
};

export const updateProfile = (profile: ProfileType) => async (
  dispatch: any
) => {
  // First dispatch: the app state is updated to inform UI
  // that the API call is starting.
  dispatch(updateProfileRequest());
  const query = `
    mutation editProfile($input: EditUserInput!) {
      editUser(input: $input) {
        user {
          ...profile
        }
      }
    }
    ${PROFILE_FRAGMENT}
  `;

  const [data, errors] = await __(
    makeRequest(JSON.stringify({ query: query, variables: { input: profile } }))
  );

  if (errors) {
    dispatch(updateProfileFailure(errors));
    throw errors;
  }
  // Second dispatch: return results.
  const {
    editUser: { user }
  } = data;
  return dispatch(updateProfileSuccess(user));
};
