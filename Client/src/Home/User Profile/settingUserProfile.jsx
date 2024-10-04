import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { RotateCw } from "lucide-react";

const ProfileSetup = () => {
  const [name, setName] = useState('');
  const [avatarSrc, setAvatarSrc] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const editorRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target.result);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const editedImage = canvas.toDataURL();
      setAvatarSrc(editedImage);
      setIsEditing(false);
    }
  };
  function handleSubmit(e) {
    e.preventDefault()
    console.log(avatarSrc , name)
  }

  return (
    <form className="flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
      <div className="w-full max-w-md space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter your name" 
          required 
          className="w-full"
        />
      </div>
      
      <div className="w-full max-w-md flex flex-col items-center space-y-4">
        <img 
          src={avatarSrc || '/placeholder-avatar.png'} 
          alt="Avatar" 
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover outline-dashed outline-2 outline-offset-2"
        />
        <Input 
          type="file" 
          onChange={handleFileChange} 
          required 
          accept="image/*" 
          className="w-full text-sm"
        />
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Avatar</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <AvatarEditor
              ref={editorRef}
              image={avatarSrc}
              width={250}
              height={250}
              border={50}
              borderRadius={125}
              color={[255, 255, 255, 0.6]}
              scale={scale}
              rotate={rotate}
              className="mx-auto"
            />
            <div className="space-y-2">
              <Label htmlFor="zoom" className="text-sm font-medium">Zoom:</Label>
              <Slider
                id="zoom"
                min={1}
                max={3}
                step={0.1}
                value={[scale]}
                onValueChange={(value) => setScale(value[0])}
                className="w-full"
              />
            </div>
            <Button onClick={() => setRotate((prev) => (prev + 90) % 360)} className="w-full">
              <RotateCw className="mr-2 h-4 w-4" /> Rotate
            </Button>
            <Button onClick={handleSaveAvatar} className="w-full">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button type="submit" className="w-full max-w-md">Submit</Button>
    </form>
  );
};

export default ProfileSetup;