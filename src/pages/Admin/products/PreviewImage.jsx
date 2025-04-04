import {TbPhotoPlus} from "react-icons/tb";
import React, {useEffect, useState} from "react";

export const PreviewImage = ({file})=> {
    const [preview,setPreview] = useState(null)



    useEffect(() => {
        if (file){
            const reader = new FileReader();

            reader.onload = ()=> {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file);
            return() => {
                reader.abort()
            }
        }

    }, [file]);

    return (
        <>
            {preview ? <img src={preview} alt={"preview"}/> : <TbPhotoPlus/>}
        </>
    )


}