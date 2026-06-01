export const subirImagenCloudinary =
  async (
    base64: string
  ): Promise<string> => {

    const formData =
      new FormData();

    formData.append(
      "file",
      `data:image/jpeg;base64,${base64}`
    );

    formData.append(
      "upload_preset",
      "itt_upload"
    );

    const response =
      await fetch(
        "https://api.cloudinary.com/v1_1/dfucjpdqr/image/upload",
        {
          method: "POST",
          body: formData
        }
      );

    const data =
      await response.json();

    console.log(data);

    if (!response.ok) {

      throw new Error(
        JSON.stringify(data)
      );

    }

    return data.secure_url;

};