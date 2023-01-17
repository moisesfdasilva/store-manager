function convertDateTime(dateTime) {
  const yearNow = dateTime.getFullYear();
  const monthNow = (dateTime.getMonth()) < 9 ? (
    `0${(dateTime.getMonth() + 1)}`) : (dateTime.getMonth() + 1);
  const dateNow = dateTime.getDate();
  const hourMinSecNow = dateTime.toLocaleTimeString('default', { hour12: false });
  
  const fullDateNow = `${yearNow}-${monthNow}-${dateNow} ${hourMinSecNow}`;

  return fullDateNow;
}

module.exports = convertDateTime;