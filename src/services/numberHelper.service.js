export const numberComma = num => {
  let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return num ? num.toString().replace(comma, ',') : num
}
