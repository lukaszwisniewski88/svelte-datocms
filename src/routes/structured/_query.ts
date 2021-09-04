import type { StructuredTextGraphQlResponse } from 'datocms-structured-text-to-html-string';

export default {
	value: {
		schema: 'dast',
		document: {
			type: 'root',
			children: [
				{
					type: 'heading',
					level: 1,
					children: [
						{
							type: 'span',
							value: 'This is a'
						},
						{
							type: 'span',
							marks: ['highlight', 'underline'],
							value: 'title'
						},
						{
							type: 'inlineItem',
							item: '123'
						},
						{
							type: 'itemLink',
							item: '123',
							children: [{ type: 'span', value: 'here!' }]
						}
					]
				},
				{
					type: 'blockquote',
					attribution: 'John Doe',
					children: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'span',
									value: 'Nobody Lies, everybody is a liar!',
									marks: ['strong']
								}
							]
						}
					]
				},
				{
					type: 'block',
					item: '456'
				}
			]
		}
	},
	blocks: [
		{
			id: '456',
			__typename: 'QuoteRecord',
			quote: 'Foo bar.',
			author: 'Mark Smith'
		}
	],
	links: [
		{
			id: '123',
			__typename: 'DocPageRecord',
			title: 'How to code',
			slug: 'how-to-code'
		}
	]
} as StructuredTextGraphQlResponse;
