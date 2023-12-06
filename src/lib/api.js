import axios from "axios";

const url = "http://localhost:8001/api";

// Category
export const getCategories = () => axios.get(`${url}/category`);
export const postCategory = (name) => axios.post(`${url}/category`, { name });
export const putCategory = (num) => axios.put(`${url}/category/${num}`);
export const deleteCategory = (num) => axios.delete(`${url}/category/${num}`);

// PortfolioBox
export const getPortfolios = () => axios.get(`${url}/portfolio`);
export const postPortfolio = async (request) => {
  console.log(request);
  console.log(request.portfolioRequest);
  console.log(request.repImg);
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(request.portfolioRequest)], {
      type: "application/json",
    }),
  );
  formData.append("file", request.repImg);
  console.log(formData);
  const response = await axios.post(`${url}/portfolio`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};
export const putPortfolio = (num, portfolio) =>
  axios.put(`${url}/portfolio/${num}`, portfolio);
export const deletePortfolio = (num) => axios.delete(`${url}/portfolio/${num}`);

// Img
export const getFile = (name) => axios.get(`${url}/file/${name}`);
export const postFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${url}/file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};
