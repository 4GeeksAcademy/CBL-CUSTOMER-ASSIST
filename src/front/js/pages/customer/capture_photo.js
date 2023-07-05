import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Cloudinary } from "@cloudinary/url-gen";

let cloudName = "ouvcsexk";
const cld = new Cloudinary({
  cloud: {
    cloudName,
  },
});

export const CapturePhoto = () => {
  const constraints = {
    width: 700,
    height: 550,
    facingMode: "user",
    aspectRatio: 9 / 16,
  };

  const camRef = useRef();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [cameraOpened, setCameraOpened] = useState(false);

  const openCamera = () => {
    setCameraOpened(true);
  };

  const captureAndPreview = () => {
    if (!cameraOpened) {
      return;
    }
    const data = camRef.current.getScreenshot();
    setPrevURL(data);
  };

  const captureAndUpload = async () => {
    setLoading(true);
    try {
      const imageData = new FormData();
      imageData.append("file", prevURL);
      imageData.append("upload_preset", "ouvcsexk");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dej9g0ce5/image/upload`,
        {
          method: "POST",
          body: imageData,
        }
      );
      const imageDetails = await res.json();
      console.log(imageDetails.url);
      setId(imageDetails.public_id);
      setPrevURL(imageDetails.url);
      
    } catch (error) {
      console.log(error);
    } finally {
      setPrevURL("");
      setId("");
      // setCameraOpened(false);
      setLoading(false);
    }
  };

  const closeImage = () => {
    setPrevURL("");
    setId("");
    setCameraOpened(false);
  };

  const retakePhoto = () => {
    setPrevURL("");
    setId("");
    setCameraOpened(true);
  };

  return (
    <section className="main">
      {!cameraOpened && !prevURL && (
        <button onClick={openCamera} className="open_camera">
          Open Camera
        </button>
      )}
      {cameraOpened && !prevURL && (
        <article className="media_box">
          <Webcam
            ref={camRef}
            videoConstraints={constraints}
            screenshotFormat="image/jpeg"
          />
          <button
            disabled={loading}
            onClick={captureAndPreview}
            className="capture_btn"
          ></button>
        </article>
      )}
      {prevURL && (
        <div className="preview_box">
          <img src={prevURL} alt="captured_image" className="preview_image" />
          <div className="preview_buttons">
            <button onClick={closeImage} className="delete_btn">
              Delete
            </button>
            <button onClick={captureAndUpload} className="upload_btn">
              Upload
            </button>
            <button onClick={retakePhoto} className="retake_btn">
              Retake
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
