import React, { useEffect, useState } from "react";
import { createClient } from "pexels";

import {
  MultiSelect, Group,
  Modal,
  TextInput,
  Loader,
  Card,
  Image,
} from "@mantine/core";
import { Photo, Search } from "tabler-icons-react";

import { TOUR_TAGS } from './tagOptions'

const INITIALPHOTOS = [
  {
    alt: "Photo of Woman Sitting on Boat Spreading Her Arms",
    src: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    alt: "Person Holding Compass",
    src: "https://images.pexels.com/photos/691637/pexels-photo-691637.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
];

function LandingSection({ data, formState, dataChangeHandler }) {
  const [refresh, setRefresh] = useState(false);
  const [opened, setOpened] = useState(false);
  const [loader, setLoader] = useState(false)

  const [imagequery, setImagequery] = useState("tour");
  const [photos, setPhotos] = useState(INITIALPHOTOS);
  const [selectedImage, setSelectedImage] = useState(data.image)



  useEffect(() => {
    setLoader(true)
    const timer = setTimeout(() => {
      //Fetch photos
      fetchPhotos()

      setLoader(false);
    }, 2000)
    
    if (imagequery === "") {
      clearTimeout(timer);
      setLoader(false);
    }
    return () => clearTimeout(timer);
  }, [imagequery])

  async function fetchPhotos () {
    const client = createClient(process.env.PEXELS_API_KEY);
    const query = imagequery;
    const responsePhotos = await client.photos.search({ query });
    setPhotos(responsePhotos.photos.map(item => {
      const photo = {
        alt: item.alt,
        src: item.src.landscape
      }
      return photo
    }))
  }

  return (
    <div>
      <section
        id="landingSection"
        style={{
          backgroundImage: `url(${selectedImage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container py-5 mb-5">
          {formState === "VIEW" && (
            <div>
              <span
                className="badge bg-light text-dark p-2 px-4 mr-2"
                style={{ borderRadius: "10px" }}
              >
                <h1 className="display-1">
                  {data.title !== undefined && data.title}
                </h1>
                <p className="mb-3">{data.description}</p>
              </span>
              <div className="col-6 p-2"></div>
              {data.tourTags.map((tag, index) => {
                return (
                  <span
                    key={index}
                    className="d-inline-flex gap-1 badge bg-light text-dark p-2 mr-2"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}
          {formState !== "VIEW" && (
            <>
              <TextInput
                size="xl"
                placeholder="Tour Title"
                id="title"
                value={data.title}
                onChange={(event) =>
                  dataChangeHandler("details", "title", event.target.value)
                }
                required
              />
              <TextInput
                size="sm"
                mt="xs"
                placeholder="Description"
                id="description"
                value={data.description}
                onChange={(event) =>
                  dataChangeHandler(
                    "details",
                    event.target.id,
                    event.target.value
                  )
                }
                required
              />
              <div className="row">
                <div className="col">
                  <MultiSelect
                    id="tourTags"
                    mt="xs"
                    placeholder="Type / Choose Tour Tags"
                    data={TOUR_TAGS}
                    value={data.tourTags}
                    onChange={(value) =>
                      dataChangeHandler("details", "tourTags", value)
                    }
                    getCreateLabel={(query) => `+ Add "${query}"`}
                    searchable
                    creatable
                    // onCreate={(query) => setDetailsOptions((current) => {}[...current, query])}
                  />
                </div>
                <div className="col">
                  <div className="flex justify-content-end p-2 mt-2">
                    <button
                      type="button"
                      className="btn btn-light flex gap-2"
                      onClick={() => setOpened(true)}
                    >
                      <Photo />
                    </button>
                  </div>
                </div>
              </div>

              <Modal
                size="full"
                opened={opened}
                onClose={() => setOpened(false)}
              >
                <TextInput
                  className="mb-4"
                  size="md"
                  id="imagequery"
                  placeholder="Search for images - tour, mountains, Paris, etc "
                  value={imagequery}
                  onChange={(event) => setImagequery(event.currentTarget.value)}
                  rightSection={
                    (loader && <Loader size="xs" />) || (!loader && <Search />)
                  }
                  required
                />
                <section
                  id="dummylandingSection"
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="container py-5 mb-5">
                    <div>
                      <span
                        className="badge bg-light text-dark p-2 px-4 mr-2"
                        style={{ borderRadius: "10px" }}
                      >
                        <h1 className="display-1">
                          {data.title !== undefined && data.title}
                        </h1>
                        <p className="mb-3">{data.description}</p>
                      </span>
                      <div className="col-6 p-2"></div>
                      {data.tourTags.map((tag, index) => {
                        return (
                          <span
                            key={index}
                            className="d-inline-flex gap-1 badge bg-light text-dark p-2 mr-2"
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <Group position="center">
                  {photos.map((photo, index) => {
                    return (
                      <div key={index} className="m-3">
                        <Card shadow="sm" p="lg">
                          <Card.Section
                            component="button"
                            target="_blank"
                            onClick={() => setSelectedImage(photo.src)}
                          >
                            <Image
                              src={photo.src}
                              height={160}
                              alt={photo.alt}
                            />
                          </Card.Section>
                        </Card>
                      </div>
                    );
                  })}
                </Group>
              </Modal>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default LandingSection;
