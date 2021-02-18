import axios from "axios";

function users() {
  return axios.get("https://randomuser.me/api/?results=200&nat=US");
}

export default {
  users
};
