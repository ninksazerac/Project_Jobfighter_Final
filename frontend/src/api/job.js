import axios from "axios";

export const getJob = async (authtoken) => {
    return await axios.get("http://localhost:5000/submitjob/", 
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    });
}


export const companyApp = async (authtoken) => {
  return await axios.get("http://localhost:5000/submitjob/applications", {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
}

export const changeStatus = async (authtoken,value) => {
  return await axios.post("http://localhost:5000/submitjob/changeStatus",value,
   {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
}
