export const shortPreviewWalletAddress = (address) => {
  if (!address) return "";
  const firstPart = address?.slice(0, 5);
  const lastPart = address?.slice(address.length - 5, address.length);
  return `${firstPart}...${lastPart}`;
};
