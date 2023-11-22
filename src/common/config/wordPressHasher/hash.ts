/* eslint-disable @typescript-eslint/naming-convention */
import * as phpfunctions from './phpfunctions';

const itoa64 =
  './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const iteration_count_log2 = 8;

function crypt_private(password: string, setting: string): string {
  let output = '*0';
  if (phpfunctions.substr(setting, 0, 2) === output) output = '*1';

  if (phpfunctions.substr(setting, 0, 3) !== '$P$') return output;

  const count_log2: number = phpfunctions.strpos(itoa64, setting[3]);
  if (count_log2 < 7 || count_log2 > 30) return output;

  let count: number = 1 << count_log2;

  const salt: string = phpfunctions.substr(setting, 4, 8);
  if (phpfunctions.strlen(salt) !== 8) return output;

  let hash: string = phpfunctions.md5(salt + '' + password, true);
  do {
    hash = phpfunctions.md5(hash + '' + password, true);
  } while (--count);

  output = phpfunctions.substr(setting, 0, 12);
  output += encode64(hash, 16);

  return output;
}

function gensalt_private(input: string): string {
  let output = '$P$';
  output += itoa64[Math.min(iteration_count_log2 + 5, 30)];
  output += encode64(input, 6);

  return output;
}

function encode64(input: string, count: number): string {
  let output = '';
  let i = 0;
  do {
    let value: number = phpfunctions.ord(input[i++]);
    output += itoa64[value & 0x3f];
    if (i < count) value |= phpfunctions.ord(input[i]) << 8;

    output += itoa64[(value >> 6) & 0x3f];

    if (i++ >= count) break;

    if (i < count) value |= phpfunctions.ord(input[i]) << 16;
    output += itoa64[(value >> 12) & 0x3f];
    if (i++ >= count) break;

    output += itoa64[(value >> 18) & 0x3f];
  } while (i < count);

  return output;
}

function HashPassword(password: string): string {
  const salt: string = gensalt_private(phpfunctions.sixCharRandom());
  const hash: string = crypt_private(password, salt);

  return hash;
}

function CheckPassword(password: string, stored_hash: string): boolean {
  const hash: string = crypt_private(password, stored_hash);

  return hash === stored_hash;
}

export { HashPassword, CheckPassword };
