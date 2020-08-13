import morgan from 'morgan';

morgan.token('pid', function getPid() {
  return process.pid;
});

export function morganJsonFormatter(tokens, req, res): string {
  return JSON.stringify({
    'remote-address': tokens['remote-addr'](req, res),
    time: tokens.date(req, res, 'iso'),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    'http-version': tokens['http-version'](req, res),
    'status-code': tokens.status(req, res),
    'content-length': tokens.res(req, res, 'content-length'),
    referrer: tokens.referrer(req, res),
    'user-agent': tokens['user-agent'](req, res),
    pid: tokens.pid(req, res),
  });
}
