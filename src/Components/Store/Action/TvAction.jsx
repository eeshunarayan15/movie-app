export { removetv } from "../Reducer/tvSlice";
import axios from "../../../Utils/axios";
import { loadtv } from "../Reducer/tvSlice";
export const asyncloadtv = (id) => async (dispatch, getstate) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const translations = await axios.get(`/tv/${id}/translations`);
     const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    let theutimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map(t=>t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results,
    };
    dispatch(loadtv(theutimatedetails))
    console.log(theutimatedetails);
  } catch (error) {
    console.log("error" + error);
  }
};
