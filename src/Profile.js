import { useEffect, useState } from "react";
import { useAuth, upload } from "./firebase";

export default function Profile() {

    const currentUser = useAuth();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("https://www.directive.com/images/easyblog_shared/July_2018/7-4-18/totw_network_profile_400.jpg");

    function handleChange(e) {
       if (e.target.files[0]) {
        setPhoto(e.target.files[0])
       }
    }

    function handleClick() {
      upload(photo, currentUser, setLoading);
    }

    useEffect(() => {
        if (currentUser && currentUser.photoURL) {

            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser])

 return (
    <div className="fields">
        <img src={photoURL} alt="Avatar" className="avatar" />
        <input type="file" onChange={handleChange} />
        <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
    </div>
 );
}