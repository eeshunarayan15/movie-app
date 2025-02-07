export { removeperson } from "../Reducer/peopleSlice";
import axios from "../../../Utils/axios";
import { loadperson } from "../Reducer/peopleSlice";
export const asyncloadperson = (id) => async (dispatch, getstate) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedcredits = await axios.get(`/person/${id}/combined_credits`);
    const tvcredits = await axios.get(`/person/${id}/tv_credits`);
    const moviecredits = await axios.get(`/person/${id}/movie_credits`);

    let theutimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedcredits: combinedcredits.data,
      tvcredits: tvcredits.data,
      moviecredits: moviecredits.data,
    };
    dispatch(loadperson(theutimatedetails));
    console.log(theutimatedetails);
  } catch (error) {
    console.log("error" + error);
  }
};
