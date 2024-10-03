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
    <form className=" flex flex-col justify-center items-center h-dvh gap-4 " onSubmit={handleSubmit} >
      <div className="space-y">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter your name" reqired />
      </div>
      <img src={avatarSrc} alt="" className="w-24 h-24 rounded-full object-cover outline-dashed" />
      <div >
        <div className="flex items-center border-dotted">
          <div className="space-y-2">
            <Input type="file" onChange={handleFileChange} reqired accept="image/*" className="w-full" placeholder="Chose your image" />
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Avatar</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <AvatarEditor
                    borderRadius={125}
                    ref={editorRef}
                    image={avatarSrc}
                    width={250}
                    height={250}
                    border={50}
                    color={[255, 255, 255, 0.6]}
                    scale={scale}
                    rotate={rotate}
                  />
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="zoom">Zoom:</Label>
                    <Slider
                      id="zoom"
                      min={1}
                      max={3}
                      step={0.1}
                      value={[scale]}
                      onValueChange={(value) => setScale(value[0])}
                    />
                  </div>
                  <Button onClick={() => setRotate((prev) => (prev + 90) % 360)}>
                    <RotateCw className="mr-2 h-4 w-4" /> Rotate
                  </Button>
                  <Button onClick={handleSaveAvatar}>Save Changes</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ProfileSetup;