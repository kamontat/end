export type Worker<I, R> = (item: I, index: number) => Promise<R>;

export interface Option {
  stopOnErr: boolean;
}

export async function Pool<T, R>(
  arr: T[] = [],
  worker: Worker<T, R>,
  concurrency: number = 1,
  options: Option = { stopOnErr: false }
) {
  const end = arr.length;
  const result: R[] = [];
  let ind = 0;

  // Like a thread
  const runner = async () => {
    if (ind < end) {
      // Make a thread-safe copy of index
      const _ind = ind;

      const item = arr[ind++];

      // Assign the result from worker to the same index as data was taken from
      try {
        result[_ind] = await worker(item, _ind);
      } catch (err) {
        if (options.stopOnErr) throw new Error(err);
        result[_ind] = err;
      }

      return runner();
    }
  };

  const runners: void[] = [];

  // Spawn threads
  for (let i = 0; i < concurrency; i++) {
    if (i >= end) break;
    runners.push(runner());
  }

  await Promise.all(runners);
  return result;
}
