import SecureLS from "secure-ls";

const secureLS = new SecureLS({
  encodingType: "aes",
  isCompression: false,
  encryptionSecret: import.meta.env.VITE_SECURE_LS_SECRET,
});

export default secureLS;
