import React, { useState, useEffect, useMemo } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Select } from '@mantine/core';


function App() {
  const [data, setData] = useState("Not Found");
  const [init, setInit] = useState(true);
  const [cameras, setCameras] = useState([]);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    if(init) {
      navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
        console.log(deviceInfos);
        const cameras = deviceInfos.filter((deviceInfos) => {
          return deviceInfos.kind === 'videoinput';
        });
        const defaultCameraId = localStorage.getItem('defaultCameraId');
        console.log(defaultCameraId);
        setCameras(cameras);
        if(defaultCameraId) {
          const camera = cameras.find(camera => camera.deviceId === defaultCameraId);
          setTimeout(() => {
            setCamera(camera);
          }, 10000)
        }
       
      });
      setInit(false);
    }
    
  }, [init]);

  const changeCamera = async () => {
    const videos = document.getElementsByTagName('video');
    const cameraVideo = videos[0];
    console.log(cameraVideo, cameraVideo.srcObject)
    if (cameraVideo && cameraVideo.srcObject) {
      cameraVideo.srcObject.getTracks().forEach(t => t.stop());
      const constraints = {
        audio: false,
        video: { deviceId: { exact: camera.deviceId } }
      };
      localStorage.setItem('defaultCameraId', camera.deviceId);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(cameraVideo);
      cameraVideo.srcObject = stream;
    }
    
  }

  const camerasDictionary = useMemo(() => {
    return cameras.map((camera) => {
      return {
        value: camera,
        label: camera.label,
      }
    })
  }, [cameras])

  useEffect(() => {
    const handleCameraChange = async() => {
      if(camera) {
        changeCamera();
      }
    }
    handleCameraChange();
  }, [camera])


  return (
    
    <div className="video-container">
      <Select
        label="Your favorite framework/library"
        placeholder="Pick one"
        data={camerasDictionary}
        value={camera}
        onChange={setCamera}
      />

      <BarcodeScannerComponent
        id="asd"
        width={500}
        height={500}
        // torch
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
      />
      <p>{data}</p>
      
    </div>
  );
}

export default App;
