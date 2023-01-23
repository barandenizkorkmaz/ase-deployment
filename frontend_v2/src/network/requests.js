import axios from "axios"

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