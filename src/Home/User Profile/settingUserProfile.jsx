import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReactCrop from 'react-image-crop';
const ProfileInput = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [crop, setCrop] = useState({ unit: '%', width: 30, height: 30 });
  const [croppedImage, setCroppedImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (crop) => {
    if (image && crop.width && crop.height) {
      const img = document.createElement('img');
      img.src = image;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          img,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
        const croppedImageUrl = canvas.toDataURL('image/jpeg');
        setCroppedImage(croppedImageUrl);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission of the profile data here
    console.log({ image, name });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm">
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-100 file:text-blue-700
                       hover:file:bg-blue-200"
          />
        </div>
        
        {image && (
          <ReactCrop
            src={image}
            crop={crop}
            onImageLoaded={(img) => {
              imgRef.current = img;
            }}
            onComplete={handleCropComplete}
            onChange={newCrop => setCrop(newCrop)}
            className="mb-4"
          />
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <Button type="submit" className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700">
          Submit
        </Button>
      </form>
      {image && (
        <div className="mt-4">
          <img src={image} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-300" />
        </div>
      )}
      {name && <h2 className="mt-2 text-lg font-semibold text-gray-800">{name}</h2>}
    </div>
  );
};

export default ProfileInput;
