import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
} from "../actions/tagsActions";

const initialState = {
  tags: [],
  loading: false,
  error: null,
};

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        tags: action.payload,
      };
    case FETCH_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tagsReducer;
