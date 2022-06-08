import { createClient } from 'pexels';


const getPhotos = async () => {
    const client = createClient(process.env.PEXELS_API_KEY);
    const query = "Tour";

    const photos = await client.photos.search({ query });
    return photos
}



export default function handler(req, res) {
  const photos = getPhotos;

  res.status(200).json({ message: "API is working!", photos });
}

