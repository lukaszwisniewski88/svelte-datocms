# DatoCMS Structured Text component

## Components involved

### smallest

- Emphasis `<em>`
- Highlight `<mark>`
- Strikethrough `<del>`
- Strong `<strong>`
- Underline `<u>`
- Code `<pre>`

### smallest

- Span - `{text}`
- InlineItem - a link with custom element
- Link - `<a url +meta >` - which has span child
- ItemLink - `link to item + meta` - which has span child

### medium

- Thematic Break - `<hr>`
- Code - `{code:string, highlight:number[], language:string }`
- Block component - `{item, props }`
- Heading - `h1 - h6 {level, }`
- Paragraph - `<p>`
- ListItem - `<li>`
- Blockquote - `<blockquote> + {attribution:string}`
- ListComponent - `<ul> || <ol> {style:'bulleted'|'numbered'}`

- Root Wrapper component - Additional component can wrap whole section of Structured Text
