export const validateFileType = (file: File) => {
  return ['image/png', 'image/jpeg'].includes(file.type);
};

export const validateFileSize = (file: File) => {
  return file.size <= 5 * 1024 * 1024;
};
