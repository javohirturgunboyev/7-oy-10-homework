import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ImagePaginationPage = () => {
  const [data, setData] = useState([]);
  const [imagesPerPage, setImagesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

 
  useEffect(() => {
    axios
      .get(`https://picsum.photos/v2/list?page=${currentPage}&limit=${imagesPerPage}`)
      .then((response) => {
        setData(response.data);
        setTotalPages(Math.ceil(100 / imagesPerPage)); 
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [currentPage, imagesPerPage]);


  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    setSearchParams({ page: value });
  };

  
  const handleImagesPerPageChange = (event) => {
    setImagesPerPage(parseInt(event.target.value));
    setCurrentPage(1); 
    setSearchParams({ page: 1 });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Image Pagination</h1>


      <FormControl fullWidth style={{ marginBottom: "20px" }}>
        <InputLabel id="items-per-page-label"> Images per page</InputLabel>
        <Select
          labelId="items-per-page-label"
          value={imagesPerPage}
          onChange={handleImagesPerPageChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {data.map((image) => (
          <div key={image.id} style={{ width: "calc(33.333% - 10px)" }}>
            <img
              src={`https://picsum.photos/id/${image.id}/200/200`}
              alt={image.author}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p>{image.author}</p>
          </div>
        ))}
      </div>


      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default ImagePaginationPage;


