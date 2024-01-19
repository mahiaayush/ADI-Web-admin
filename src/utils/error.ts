const errorHandler = (error, dispatch, type = '', payload = {}) => {
  let errorMessage = "Server Not Responding"
  if (error.response) {
    errorMessage = error.response.data.message
    dispatch({
      type,
      payload: {
        ...payload,
        error: errorMessage
      },
    });
  } else {
    dispatch({
      type,
      payload: {
        ...payload,
        error: errorMessage
      },
    });
  }
  return { status: false, message: errorMessage }
}

export default errorHandler;