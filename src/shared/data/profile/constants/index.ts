export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";
export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

export type ProfileType = {
  avatar?: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
};

export type ProfileState = {
  isFetching: boolean;
  isSubmitting: boolean;
  profile: ProfileType;
  errors?: any;
};
