export declare type PromiseArray<U> = Promise<Array<U>>;
export declare function promiseFlatMap<In, Out>(collection: ReadonlyArray<In>, iterator: (element: In) => Array<Out> | PromiseArray<Out>): PromiseArray<Out>;
export declare function baseName(filename: string, stripExtension?: boolean): string;
