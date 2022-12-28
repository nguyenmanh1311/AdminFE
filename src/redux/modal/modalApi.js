import { setShowModalOff, setShowModalOn } from "./showModalSlice";
export const showModal = async (dispatch, repllyforId) => {
  try {
    dispatch(setShowModalOn(repllyforId));
  } catch (error) {}
};
export const offModal = async (dispatch) => {
  try {
    dispatch(setShowModalOff());
  } catch (error) {}
};
