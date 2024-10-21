interface toret {
    secure_url: string;
    public_id: string;
}

export const fileUpload = async (file: File, cloudName :string,preset:string) : Promise<toret | null> =>{
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

    const formData = new FormData();
    formData.append('upload_preset', `${preset}`)
    formData.append('file', file);

    try {
        const res = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) return null;

        const data = await res.json();
        const toret = {secure_url: data.secure_url, public_id: data.public_id};
        return toret;

    } catch (error) {
        console.log(error);
        
        return null;
    }
}