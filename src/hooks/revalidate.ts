import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload';
import { revalidateTag } from 'next/cache';

/**
 * Revalidate the Next.js cache tag for a collection when a document is
 * published or unpublished (or deleted). Wrapped so a revalidation failure
 * never blocks the Payload write. Seeds pass context.disableRevalidate to skip.
 */
export const revalidateCollection =
  (tag: string): CollectionAfterChangeHook =>
  ({ doc, previousDoc, req, context }) => {
    try {
      if (context?.disableRevalidate) return doc;
      const wasPublished = previousDoc?._status === 'published';
      const isPublished = doc?._status === 'published';
      // Collections without drafts have no _status; treat every change as publish.
      const hasStatus = '_status' in (doc ?? {});
      if (!hasStatus || isPublished || wasPublished) {
        revalidateTag(tag, 'max');
        req.payload.logger.info(`Revalidated tag: ${tag}`);
      }
    } catch (err) {
      req.payload.logger.error(`Revalidate failed for ${tag}: ${(err as Error).message}`);
    }
    return doc;
  };

export const revalidateCollectionDelete =
  (tag: string): CollectionAfterDeleteHook =>
  ({ doc, req, context }) => {
    try {
      if (context?.disableRevalidate) return doc;
      revalidateTag(tag, 'max');
      req.payload.logger.info(`Revalidated tag (delete): ${tag}`);
    } catch (err) {
      req.payload.logger.error(`Revalidate failed for ${tag}: ${(err as Error).message}`);
    }
    return doc;
  };

export const revalidateGlobal =
  (tag: string): GlobalAfterChangeHook =>
  ({ doc, req, context }) => {
    try {
      if (context?.disableRevalidate) return doc;
      revalidateTag(tag, 'max');
      req.payload.logger.info(`Revalidated global tag: ${tag}`);
    } catch (err) {
      req.payload.logger.error(`Revalidate failed for ${tag}: ${(err as Error).message}`);
    }
    return doc;
  };
