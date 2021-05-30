import { CONFIGS } from './configs';

export const setLocaStorage = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.user.email);
};

export const reOrderImages = (sourceElement, targetElement, images) => {
  try {
    const list = images.filter((item, i) => i.toString() !== sourceElement);
    // this is the removed item
    const removed = images.filter(
      (item, i) => i.toString() === sourceElement
    )[0];

    // insert removed item after this number.
    let insertAt = Number(targetElement);

    // if dropped at last item, don't increase target id by +1. max-index is arr.length
    if (insertAt >= list.length) {
      return list.slice(0).concat(removed);
    } else if (insertAt < list.length) {
      // original list without removed item until the index it was removed at
      let orderedImages = list.slice(0, insertAt).concat(removed);

      // add the remaining items to the list
      return orderedImages.concat(list.slice(insertAt));
    }

    return images;
  } catch (ex) {
    console.error(ex);
    return images;
  }
};

export const getImageURL = image => `${CONFIGS.IMAGE_HOST}/${image}.jpeg`;
