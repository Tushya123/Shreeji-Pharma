import axios from "axios";

export const createNewProject = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/newproject`,
    values
  );
};

export const uploadproductImage = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/descriptions/imageupload`,
      body
    );
  };

  export const getNewProjectByParam = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list-by-params/newproject`,
      body
    );
  };  


