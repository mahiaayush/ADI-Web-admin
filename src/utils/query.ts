const queryBuilder = (obj: any = {}) => {
  if (obj?.search) {
     obj.search = encodeURIComponent(obj.search)
  }
  return Object.keys(obj)
    .filter((key) => !!obj[key])
    .map((key) => `${key}=${obj[key]}`)
    .join('&')
}

export default queryBuilder;