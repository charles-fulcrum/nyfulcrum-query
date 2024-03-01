export const load = async () => {
  await new Promise((resolve: any) => {
    setTimeout(() => resolve(), 1000);
  });
  return {
    message: 'Hello About',
  };
};
