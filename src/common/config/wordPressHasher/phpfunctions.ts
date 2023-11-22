import * as crypto from 'crypto';

function strlen(str: string): number {
  return str.length;
}

function strpos(string: string, find: string): number {
  return string.indexOf(find);
}

function md5(string: string, raw?: boolean): string {
  const hash = crypto.createHash('md5');
  hash.update(string, 'binary');
  if (raw) {
    return hash.digest('binary');
  }

  return hash.digest('hex');
}

function sixCharRandom(): string {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function substr(string: string, start: number, count: number): string {
  return string.substring(start, start + count);
}

function ord(input: string): number {
  const r = input.charCodeAt(0);

  return r;
}

export { ord, substr, sixCharRandom, strlen, strpos, md5 };
