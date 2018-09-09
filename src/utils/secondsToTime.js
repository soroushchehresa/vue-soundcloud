export default (secs) => {
  const roundSecs = Math.round(secs);
  const hours = Math.floor(roundSecs / (60 * 60)).toString();
  const divisorForMinutes = roundSecs % (60 * 60);
  const minutes = Math.floor(divisorForMinutes / 60).toString();
  const divisorForSeconds = divisorForMinutes % 60;
  const seconds = Math.ceil(divisorForSeconds).toString();
  if (!(Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds))) {
    // eslint-disable-next-line
    return `${hours === '0' ? '' : `${hours.length === 1 ? `0${hours}` : hours}:`}${minutes === '0' ? '00' : minutes.length === 1 ? `0${minutes}` : minutes}:${seconds === '0' ? '00' : seconds.length === 1 ? `0${seconds}` : seconds}`;
  }
  return '';
};
