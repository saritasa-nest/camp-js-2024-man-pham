/** Another version of Omit but with key recommendation of given T. */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;
