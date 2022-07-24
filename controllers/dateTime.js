const Datejs = require("datejs");
const getTimeDif = function (past) {
  const millisecondsSinceStartOfDay = Date.now() - Date.today();
  const postDate = Date.parse(past);
  const now = Date.today().add(millisecondsSinceStartOfDay).milliseconds();
  const seconds = (now - postDate) / 1000;

  const timeMap = [31536000, 2592000, 604800, 86400, 3600, 60];
  const timeNames = ["año", "mes", "semana", "día", "hora", "minuto"];
  let interval;
  for (let i = 0; i < timeMap.length; i++) {
    interval = seconds / timeMap[i];
    if (interval >= 1) {
      interval = Math.floor(interval);
      return interval == 1
        ? `Hace ${interval} ${timeNames[i]}`
        : `Hace ${interval} ${timeNames[i]}s`;
    }
  }
  interval = Math.floor(seconds);
  return interval === 1
    ? `Hace ${interval} segundo`
    : `Hace ${interval} segundos`;
};

module.exports.getTimeDif = getTimeDif;
