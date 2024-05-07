import axios from "axios";
import FormData from "form-data";
import config from "../../../config/default";

function createForm(file: any) {
  const form = new FormData();
  form.append("file", file, "file");
  return form;
}

async function getPredictionFromModel(form: any) {
  try {
    const prediction = await axios.post(config.modelEndPoint, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return prediction;
  } catch (e) {
    throw e;
  }
}

export { createForm, getPredictionFromModel };
