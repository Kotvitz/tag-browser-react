import axios from "axios";

export const FETCH_TAGS_REQUEST = "FETCH_TAGS_REQUEST";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_FAILURE = "FETCH_TAGS_FAILURE";

export const fetchTagsRequest = () => ({
  type: FETCH_TAGS_REQUEST,
});

export const fetchTagsSuccess = (tags) => ({
  type: FETCH_TAGS_SUCCESS,
  payload: tags,
});

export const fetchTagsFailure = (error) => ({
  type: FETCH_TAGS_FAILURE,
  payload: error,
});

export const fetchTags = (params) => {
  return async (dispatch) => {
    dispatch(fetchTagsRequest());
    try {
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/tags?site=stackoverflow",
        { params }
      );
      dispatch(fetchTagsSuccess(response.data.items));
    } catch (error) {
      dispatch(fetchTagsFailure(error.message));
    }
  };
};
