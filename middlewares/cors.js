// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://movies-yan.nomoredomains.xyz',
  'https://movies-yan.nomoredomains.xyz',
  'localhost:3005',
];

module.exports = (req, res, next) => {
  const origin = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', allowedCors);
    const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
    if (method === 'OPTIONS') {
      const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
      const requestHeaders = req.headers['access-control-request-headers'];
      // разрешаем кросс-доменные запросы любых типов (по умолчанию)
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      // разрешаем кросс-доменные запросы с этими заголовками
      res.header('Access-Control-Allow-Headers', requestHeaders);

      return res.end();
    }
  }
  next();
};
