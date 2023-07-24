import React, { useEffect, useState } from "react";
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component";
import "./PictureCollage.css"

const ACCESS_KEY = "a22f61e98da4efa25d8860e77a91a596867dd335ecdf7feb12e086943db9565a"

const PictureCollage = () => {
    const [images, setImages] = useState([]);
    const [loaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = (count = 10) => {
        axios
            .get(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}`)
            .then((res) => {
                setImages([...images, ...res.data]);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
    };

    return (
        <div>
            <h1>Infinite Scroll Picture Collage</h1>
            <InfiniteScroll
                dataLength={ images }
                next={ () => fetchImages(5) }
                hasMore={ true }
                loader={ <img src="https://media0.giphy.com/media/RHEqKwRZDwFKE/100.webp?cid=ecf05e47qs3jkiyo8pcexh9yjwee0zgyroxxo44o7jo5k9a7&ep=v1_gifs_search&rid=100.webp&ct=g" alt="loading" className="PictureCollage-loader-image" /> }>
                <div className="PictureCollage-container">
                    { loaded ? images.map((image, index) => (
                        <img
                            src={ image.urls.regular }
                            key={ index }
                            alt={ image.alt_description }
                            className="PictureCollage-image"
                        />
                    ))
                        : "" }
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default PictureCollage;