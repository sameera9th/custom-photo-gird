export const ACTIONS =  {
    SIGNUP: 1,
    SIGNIN: 2
};

export const DROP_SECTIONS = {
    DEFAULT: {
        ID: 'allImages',
        TITLE: 'Original Photos'
    },
    SELECTED: {
        ID: 'selectedImages',
        TITLE: 'Selected Photos'
    }
}

export const ERROR_MESSAGES = {
    EXCEED_MAX_SELECTION: (maxPhotosPerAlbum) => `You can only select ${maxPhotosPerAlbum} photos into an album`,
    ORDER_DEFAULT_PHOTOS: `You can't reorder default images`
}