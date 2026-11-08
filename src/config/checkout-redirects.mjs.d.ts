export declare const CHECKOUT_URLS: {
  readonly fc27: string;
  readonly dayz: string;
  readonly hwidSpoofer: string;
};

export declare const CHECKOUT_PATH_REDIRECTS: ReadonlyMap<string, string>;

export declare function resolveCheckoutPathRedirect(pathname: string): string | null;
