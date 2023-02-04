import axios from "axios"
import { loadState } from "../localstorage/LocalStorage";

export const instanceOfAxious = axios.create();

instanceOfAxious.interceptors.request.use(
    function(config) {
      const token = loadState("token"); 
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token; 
      }
      config.headers["Access-Control-Allow-Headers"] =  "*";
      config.headers["Access-Control-Allow-Methods"] =  "*";
      config.headers["Access-Control-Allow-Origin"] =  "*";
      config.headers["mode"] =  "cors";
      config.headers["referrerPolicy"] = "origin-when-cross-origin";
      config.headers["redirect"] = "follow";
      config.headers["credentials"] = "include";
      config.headers["cache"] = "no-cache";
      config.headers["method"] = ["GET","POST"];
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
);

/*

The following two are examples of how to send post and get requests using axios. Please note that there are cases that
returns status code 200, but the request actually fails. In this case, please check the boolean response field called
isSuccessful. You can also check the request body and responses from swagger-ui.

axios.post("user/login", userObject)
            .then(
                (res) => {
                    console.log(res)
                    console.log(res.data)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )

axios.get("delivery/list/dispatcher/all")
            .then(
                (res) => {
                    console.log(res)
                    console.log(res.data)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )

 */