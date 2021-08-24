# Svelte-datocms

# Progressive/responsive image component

`<Image />` is a Svelte component specially designed to work seamlessly with DatoCMS’s [`responsiveImage` GraphQL query](https://www.datocms.com/docs/content-delivery-api/uploads#responsive-images) that optimizes image loading for your sites.

This is a port to Svelte from react version.

## Props

| prop                  | type                     | required           | description                                                                                                                                                                                                                                   | default |
| --------------------- | ------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| data                  | `ResponsiveImage` object | :white_check_mark: | The actual response you get from a DatoCMS `responsiveImage` GraphQL query.                                                                                                                                                                   |         |
| fadeInDuration        | integer                  | :x:                | Duration (in ms) of the fade-in transition effect upoad image loading                                                                                                                                                                         | 500     |
| intersectionThreshold | float                    | :x:                | Indicate at what percentage of the placeholder visibility the loading of the image should be triggered. A value of 0 means that as soon as even one pixel is visible, the callback will be run. A value of 1.0 means that the threshold isn't | 0       |
| lazyLoad              | Boolean                  | :x:                | Wheter enable lazy loading or not                                                                                                                                                                                                             | true    |
| explicitWidth         | Boolean                  | :x:                | Wheter the image wrapper should explicitely declare the width of the image or keep it fluid                                                                                                                                                   | false   |

### The `ResponsiveImage` object

The `data` prop expects an object with the same shape as the one returned by `responsiveImage` GraphQL call. It's up to you to make a GraphQL query that will return the properties you need for a specific use of the `<Image>` component.

- The minimum required properties for `data` are: `aspectRatio`, `width`, `sizes`, `srcSet` and `src`;
- `alt` and `title`, while not mandatory, are all highly suggested, so remember to use them!
- You either want to add the `webpSrcSet` field or specify `{ auto: format }` in your `imgixParams`, to automatically use WebP images in browsers that support the format;
- If you provide both the `bgColor` and `base64` property, the latter will take precedence, so just avoiding querying both fields at the same time, it will only make the response bigger :wink:

Here's a complete recap of what `responsiveImage` offers:

| property    | type    | required           | description                                                                                     |
| ----------- | ------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| aspectRatio | float   | :white_check_mark: | The aspect ratio (width/height) of the image                                                    |
| width       | integer | :white_check_mark: | The width of the image                                                                          |
| height      | integer | :white_check_mark: | The height of the image                                                                         |
| sizes       | string  | :white_check_mark: | The HTML5 `sizes` attribute for the image                                                       |
| srcSet      | string  | :white_check_mark: | The HTML5 `srcSet` attribute for the image                                                      |
| src         | string  | :white_check_mark: | The fallback `src` attribute for the image                                                      |
| webpSrcSet  | string  | :x:                | The HTML5 `srcSet` attribute for the image in WebP format, for browsers that support the format |
| alt         | string  | :x:                | Alternate text (`alt`) for the image                                                            |
| title       | string  | :x:                | Title attribute (`title`) for the image                                                         |
| bgColor     | string  | :x:                | The background color for the image placeholder                                                  |
| base64      | string  | :x:                | A base64-encoded thumbnail to offer during image loading                                        |

## Blurhash Component

`<Blurhash/>` is a Svelte component to display an image placeholder from blurhash string.

### Props

| prop   | type   | required           | description                                            | default |
| ------ | ------ | ------------------ | ------------------------------------------------------ | ------- |
| hash   | string | :white_check_mark: | blurhash string of the image                           |         |
| width  | number | :x:                | x resolution of the drawed canvas                      | 32      |
| height | number | :x:                | x resolution of the drawed canvas                      | 32      |
| punch  | number | :x:                | punch is intesivity of the color effect after decoding | 1       |

# More coming soon...
