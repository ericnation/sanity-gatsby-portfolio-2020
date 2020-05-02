import { format, isFuture } from 'date-fns';
import { useEffect, useState } from 'react';
import breakpoints from '../styles/vars/breakpoints';

export function cn(...args) {
  return args.filter(Boolean).join(' ');
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map((edge) => edge.node);
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}

export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(publishedAt);
}

export function getBlogUrl(publishedAt, slug) {
  return `/blog/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`;
}

export function buildImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}

/**
 * Hook for creating an instance of matchMedia for checking a particular breakpoint.
 *
 * @param {string} breakpointName - Breakpoint name. Must correspond to one of the keys in config/css/breakpoints.js
 * @returns {bool} - Does the viewport width match this breakpoint/media query?
 */
export function useBreakpoint(breakpointName) {
  if (breakpoints[breakpointName]) {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia(`(${breakpoints[breakpointName]})`);
      const [matches, setMatches] = useState(mq.matches);
      const checkMq = (e) => {
        setMatches(e.matches);
      };

      useEffect(() => {
        mq.addListener(checkMq);

        return function cleanup() {
          mq.removeListener(checkMq);
        };
      });
      return matches;
    }
  }

  return false;
}
