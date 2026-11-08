import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  const retiredToEnglish = ['cs', 'ru', 'zh-cn', 'zh-tw', 'pl'];
  const first = pathname.split('/').filter(Boolean)[0]?.toLowerCase();
  if (first && (retiredToEnglish.includes(first) || first === 'pt-br')) {
    const tail = pathname === `/${first}` ? '/' : pathname.slice(first.length + 1);
    const targetPath = first === 'pt-br' ? `/pt${tail === '/' ? '/' : tail}` : tail || '/';
    const dest = new URL(targetPath + url.search, url.origin);
    return context.redirect(dest.toString(), 301);
  }

  const destination = resolveCheckoutPathRedirect(pathname);
  if (destination) {
    return context.redirect(destination, 302);
  }
  return next();
});
