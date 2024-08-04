export default async function Await<T1, T2>({
  promises,
  children,
}: {
  promises: [Promise<T1>, Promise<T2> | null];
  children: (value1: T1, value2: T2 | null) => JSX.Element;
}) {
  const [data1, data2] = await Promise.all(promises);

  return children(data1, data2);
}
