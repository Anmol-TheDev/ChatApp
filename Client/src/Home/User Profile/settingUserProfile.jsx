import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input";
import "croppie/croppie.css"
import Croppie from "croppie"
import { Label } from "../../components/ui/label";
import React, { useRef, useState,useEffect } from "react";

function  ProfileSetup () {
  const [imgSrc,setImgSrc] = useState(null)
  const croppieRef = useRef(null)
  const [croppie,setCroppie] = useState(null)
  const croppieOptions = {
    showZoomer: true,
    enableOrientation: true,
    mouseWheelZoom: "ctrl",
    viewport: {
      width: 300,
      height: 200,
      type: "square"
    },
    
    boundary: {
      width: "50vw",
      height: "50vh"
    }
  };
  useEffect(() => {
    let newCroppie = null
    if (croppieRef.current && !croppie) {
      newCroppie = new Croppie(croppieRef.current, {croppieOptions});
    }
    setCroppie(newCroppie);

    return () => {
      if (croppie) {
        croppie.current.destroy();
        croppie.current = null;
      }
    };
  }, [imgSrc]);

function handleImage (e){
    const file = e.target.files[0];
    if(file && croppie){
      const reader = new FileReader();
      reader.onload = (e) => {
        croppie.bind({ url: e.target.result });
      }
      reader.readAsDataURL(file)
    }
}

function handleSubmit(e){
  e.preventDefault();

  if(croppie){
    croppie.result('blob').then((blob)=>{
     setImgSrc(URL.createObjectURL(blob))
    })
  }

}

  return (
      <div>
    {imgSrc && (
      <div>
        <img src={imgSrc} alt="" />
      </div>
    )}
    <div>
        <form onSubmit={handleSubmit}>
          <Label>Upload Image</Label>
           <div ref={croppieRef} className="w-72 h-72"></div>
          <Input type="file" onChange={handleImage} />
          <Button type="submit" ></Button>
        </form>
    </div>
    </div>
  )
}

export default ProfileSetup