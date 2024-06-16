export type TByObjectValues<T> = { [K in keyof T]: T[K] }[keyof T];
