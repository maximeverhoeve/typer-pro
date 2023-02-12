export const getDisplayName = ({
  id,
  name,
}: {
  id: string;
  name: string;
}): string => {
  return name + '<span>#' + id.slice(0, 5) + '</span>';
};
