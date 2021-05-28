import React from "react";
import ContentLoader from 'react-content-loader'

const ImageLoader = () => (
  <ContentLoader 
    // height={140}
    speed={1}
    backgroundColor={'#333'}
    foregroundColor={'#999'}
    viewBox="0 0 380 70">  
    <rect x="5" y="8" rx="0" ry="0" width="65" height="60" />
    <rect x="82" y="8" rx="0" ry="0" width="65" height="60" />
    <rect x="158" y="8" rx="0" ry="0" width="65" height="60" />
    <rect x="234" y="8" rx="0" ry="0" width="65" height="60" />
    <rect x="310" y="8" rx="0" ry="0" width="65" height="60" />
  </ContentLoader>
);

const ImageContentLoader = () => {
    return(
        <React.Fragment>
            <ImageLoader/>
            <ImageLoader/>
            <ImageLoader/>
            <ImageLoader/>
            <ImageLoader/>
            <ImageLoader/>
            <ImageLoader/>
        </React.Fragment>
    )
}

export default ImageContentLoader;
