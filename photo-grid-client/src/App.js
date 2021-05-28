import React, { useEffect } from "react";
import DragAndDrop from "./components/DragAndDrop";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "./components/modal";
import {
  getAllImages,
  getSelectedImages
} from "./redux/actions/image";
import { ACTIONS } from "./utils/constants";
import NavBar from "./components/navbar";
import { DragAndDropClickProvider } from "./context/DragAndDropClickContext";

import { signInUser, signUpUser, logout } from "./redux/actions/user";

const App = React.memo(() => {
  const dispatch = useDispatch();
  const { allImages, selectedImagesIds, selectedImages, fetchingDefaultImages, error } = useSelector((state) => state.image);

  const { user } = useSelector((state) => state.user);

  const signUpOrSignIn = ({ email, password, action }) => {
    if (action === ACTIONS.SIGNIN) {
      dispatch(signInUser({ email, password }));
    } else if (action === ACTIONS.SIGNUP) {
      dispatch(signUpUser({ email, password }));
    }
  };

  const userLogout = () => {
    dispatch(logout());
    dispatch(getAllImages());
  };

  useEffect(() => {
    if(user.email){
      dispatch(getSelectedImages());
    }
    dispatch(getAllImages());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(user.email){
      dispatch(getSelectedImages());
    }
    // eslint-disable-next-line
  }, [user.email]);

  return (
    <div className="app">
      <DragAndDropClickProvider>
        <NavBar email={user.email} logout={userLogout}/>
        <DragAndDrop
          dispatch={dispatch}
          allImages={allImages.filter(item => selectedImagesIds.indexOf(item.id) < 0)}
          selectedImages={selectedImages}
          fetchingDefaultImages={fetchingDefaultImages}
          error={error}
        />
        <Modal submit={signUpOrSignIn} />
      </DragAndDropClickProvider>
      {error && <div className="bar error animated fadeOut">{error}</div>}
    </div>
  );
});

export default App;
