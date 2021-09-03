export const generateAvatar = (seed: string): string => {
  console.log(seed);
  return `https://avatars.dicebear.com/api/open-peeps/${seed}.svg?size=310`;
};
