import React, { useEffect, useRef, useContext } from "react";
import { Context } from "../store/appContext";

const UploadWidget = () => {
    const { actions, store } = useContext(Context);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const photosToUploadCounter = store.customer_media

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dsonpr8ip',
            uploadPreset: 'lv7scrwz',
            sources: ['local', 'camera']
        }, function (error, result) {
            console.log(result.event);
            if (result.event === 'queues-end') actions.setCustomerMedia(result.info.files.map(e => e.uploadInfo.secure_url));                
        })
    }, [])
    return (
        <button
            className="btn btn-success col-4 position-relative"
            onClick={() => widgetRef.current.open()}>
            <i className="fa-regular fa-images me-2"></i>
            <i className="fa-solid fa-camera me-2"></i>
            Upload Photos
            <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
                {store.customer_media.length}
                <span className="visually-hidden">unread messages</span>
            </span>
        </button>
    )
}

export default UploadWidget;