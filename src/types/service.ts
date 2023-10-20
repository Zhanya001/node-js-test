export interface CommonService<T, E> {
  create: <P extends Omit<T, "status" | "id">>(
    payload: P
  ) => Promise<Omit<T, "status">>;
  delete: (id: number) => Promise<T>;
  update: <P extends Partial<Omit<T, "id" | "status">>>(
    id: number,
    payload: P
  ) => Promise<Omit<T, "status">>;
  get: (id: number) => Promise<E>;
  getAll: () => Promise<Omit<E, "status">[]>;
}
