import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  CARD_LOT,
  CARD_LOT_SUCCESS,
  CARD_LOT_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getCardLotAction = (search = null) => (dispatch) => {
    const query = queryBuilder({
        search,
    });  
    return http.get(`${ADMIN_API_ENDPOINT_V2}${CARD_LOT}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: CARD_LOT_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: CARD_LOT_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

export default getCardLotAction