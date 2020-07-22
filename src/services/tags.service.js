import axios from "axios";

let getTags = (url, cb) => {
  axios
    .get(url)
    .then((response) => {
      let tags = response.data.data.map((tag)=> tag.name);
      cb(tags, null);
    })
    .catch((error) => {
      cb(null, error);
    });
};

export { getTags };
