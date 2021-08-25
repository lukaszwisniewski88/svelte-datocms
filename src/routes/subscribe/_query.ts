import type { StructuredTextGraphQlResponse } from 'datocms-structured-text-to-html-string';

type ResponsiveImageType = {
	/** The aspect ratio (width/height) of the image */
	aspectRatio: number;
	/** A base64-encoded thumbnail to offer during image loading */
	base64?: string;
	/** The height of the image */
	height?: number;
	/** The width of the image */
	width: number;
	/** The HTML5 `sizes` attribute for the image */
	sizes?: string;
	/** The fallback `src` attribute for the image */
	src?: string;
	/** The HTML5 `srcSet` attribute for the image */
	srcSet?: string;
	/** The HTML5 `srcSet` attribute for the image in WebP format, for browsers that support the format */
	webpSrcSet?: string;
	/** The background color for the image placeholder */
	bgColor?: string;
	/** Alternate text (`alt`) for the image */
	alt?: string;
	/** Title attribute (`title`) for the image */
	title?: string;
};
type BlogPost = {
	id: string;
	title: string;
	excerpt: StructuredTextGraphQlResponse;
	slug: string;
	coverImage: {
		responsiveImage: ResponsiveImageType;
	};
	author: {
		name: string;
		avatar: {
			responsiveImage: ResponsiveImageType;
		};
	};
};

export type QueryResponseType = {
	page: {
		seo: unknown;
	};
	site: {
		favicon: unknown;
	};
	blogPosts: BlogPost[];
};

export type QueryVariables = {
	first: number;
};
const RESPONSIVE_IMAGE_FRAGMENT = `
  aspectRatio
  height
  sizes
  src
  webpSrcSet
  srcSet
  width
  alt
  base64
  title
`;

const META_TAGS_FRAGMENT = `
  attributes
  content
  tag
`;
export const query = `
  query AppQuery($first: IntType) {
    page: blog {
      seo: _seoMetaTags {
        ${META_TAGS_FRAGMENT}
      }
    }
    site: _site {
      favicon: faviconMetaTags {
        ${META_TAGS_FRAGMENT}
      }
    }
    blogPosts: allBlogPosts(first: $first, orderBy: _firstPublishedAt_DESC) {
      id
      title
      slug
      excerpt { value }
      coverImage {
        responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 750, auto: format }) {
          ${RESPONSIVE_IMAGE_FRAGMENT}
        }
      }
      author {
        name
        avatar {
          responsiveImage(imgixParams: { fit: crop, ar: "1:1", w: 40, auto: format }) {
            ${RESPONSIVE_IMAGE_FRAGMENT}
          }
        }
      }
    }
  }
`;
