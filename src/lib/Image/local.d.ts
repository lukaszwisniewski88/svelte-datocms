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
type ImageState = {
	lazyLoad: boolean;
	inView: boolean;
	loaded: boolean;
};
