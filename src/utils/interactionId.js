import { v4 as uuidv4 } from "uuid";
const interactionId = () => {
  if (!localStorage.getItem("interactionId")) {
    return localStorage.setItem("interactionId", uuidv4());
  }
  return localStorage.getItem("interactionId");
};

export default interactionId;
