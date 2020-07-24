import axios from "axios";
import qs from "qs";

let searchServices = (url, payload, cb) => {
  console.log(qs.stringify(payload));
  axios
    .get(url, { params: payload })
    .then((response) => {
      console.log(response);
      let services = response.data.data;
      cb(services, null);
    })
    .catch((error) => {
      cb(null, error);
    });
};

export { searchServices };
