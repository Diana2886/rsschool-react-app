export const validateFileType = (file: File) => {
  return ['image/png', 'image/jpeg'].includes(file.type);
};

export const validateFileSize = (file: File) => {
  return file.size <= 5 * 1024 * 1024;
};

export const validateFile = (
  value: FileList | File | null,
  validateFn: (file: File) => boolean
): boolean => {
  if (!value) return false;

  const file = value instanceof FileList ? value[0] : value;
  return file instanceof File ? validateFn(file) : false;
};
