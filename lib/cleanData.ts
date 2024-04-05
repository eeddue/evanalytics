export const CleanData = (data: string | undefined) => {
  if (data) {
    const cleaned = data.replace("|", "");
    return JSON.parse(cleaned);
  }

  return {};
};
