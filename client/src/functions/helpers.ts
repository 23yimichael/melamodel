import { post } from "../utils/axios-config";

export const sendPatientResults = (info, callback) =>
  post("/sendPatientResults", info, callback);

export const doctorLogin = (info, callback) =>
  post("/doctorLogin", info, callback);

{
  /*export const submit = () => {
       sendPatientResults({
           apiPass: ‘xxxxxx’
           patientId: ‘xxxxxxx’
           result: 0,
           note: ‘left forearm mole’
       }, (err, data) => {
           // The response arrived
           if (err) {
 // ERROR (err is the error message)
           } else {
// SUCCESS (data is the response)
// do success actions here
           }
       });
   };*/
}
