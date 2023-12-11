import React, { useState } from 'react';
import axios from '../api/axios.js';


const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage);

    axios.post("/upload-img-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-rapidapi-host": "file-upload8.p.rapidapi.com",
        "x-rapidapi-key": "your-rapidapi-key-here",
      },
    })
      .then((response) => {
        // handle the response
        console.log(response);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div>
      <p>Filename: {selectedImage.name}</p>
      <p>Filetype: {selectedImage.type}</p>
      <p>Size in bytes: {selectedImage.size}</p>
      {/* <p>
        lastModifiedDate:{' '}
			{selectedImage.lastModifiedDate.toLocaleDateString()}
      </p> */}
      <form onSubmit={handleImageUpload} encType="multipart/form-data">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUploadForm;