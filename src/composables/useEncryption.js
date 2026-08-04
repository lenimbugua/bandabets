import CryptoJS from "crypto-js";

const keyValue = "cXB4DaTfYrsYuPdZ"; // your key value (eg: key)
const ivKey = "a2xhcgHgXCV6R4wD";
const salt = "BM3ex5RtPToYioP7";

export function encryptData(data) {
  if (data) {
    const key = CryptoJS.PBKDF2(keyValue, salt, {
      keySize: 256 / 32,
      iterations: 100,
    });
    const iv = CryptoJS.enc.Utf8.parse(ivKey); // Convert string to WordArray

    const dataString = JSON.stringify(data);

    const encrypted = CryptoJS.AES.encrypt(dataString, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  }
}

export function decrypteData(data) {
  if (data) {
    const key = CryptoJS.PBKDF2(keyValue, salt, {
      keySize: 256 / 32,
      iterations: 100,
    });
    const iv = CryptoJS.enc.Utf8.parse(ivKey);
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(data) },
      key,
      { iv: iv, mode: CryptoJS.mode.CBC }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
