import { IMAGES, SELECTED_IMAGES, STATUS } from "../types/image";

export const initialState = {
  allImages: [], // this contains all the images fetch from the given API endpoint
  selectedImages: [], // this contains all the selected images by the user from the fetched images
  selectedImagesIds: [], // this contains selected image ids
  fetchingDefaultImages: false, // fetching status from the API
  error: null, // this contains all the error messages
};

export const image = (state = initialState, action) => {
  switch (action.type) {
    case IMAGES + STATUS.FETCHING: // fetching action
      return {
        ...state,
        fetchingDefaultImages: true,
      };
    case IMAGES + STATUS.SUCCESS: // successfully fetched from the API
      return {
        ...state,
        fetchingDefaultImages: false,
        allImages: action.images,
      };
    case IMAGES + STATUS.FAIL:  // failed to fetched from the API
      return {
        ...state,
        fetchingDefaultImages: false,
        error: action.message,
      };
    case IMAGES + STATUS.UPDATE:  // select images
      return {
        ...state,
        [action.payload.dragTarget]: [
          ...state[action.payload.dragTarget],
          action.payload.item,
        ],
        selectedImagesIds: [...state.selectedImagesIds, action.payload.item.id]
      };
    case IMAGES + STATUS.DESELECT:  // deselect image
        const selectedList = state[action.payload.dragSource].filter(
          (e) => e.id !== action.payload.item.id
        );
        return {
          ...state,
          [action.payload.dragSource]: selectedList,
          selectedImagesIds: state.selectedImagesIds.filter(item => item !== action.payload.item.id)
        };
    case SELECTED_IMAGES + STATUS.SUCCESS:  // insert selected image into API
      return {
        ...state,
        fetching: false,
        selectedImages: action.images,
        selectedImagesIds: action.images.map(item => item.id)
      };
    default:
      return state;
  }
  
};