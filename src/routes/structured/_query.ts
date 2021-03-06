import type { StructuredTextGraphQlResponse } from 'datocms-structured-text-to-html-string';

export default {
	value: {
		schema: 'dast',
		document: {
			type: 'root',
			children: [
				{
					type: 'heading',
					level: 3,
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
							meta: [
								{id:'rel', value:'nofollow'}
							],
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
			quote: 'We like to have some quotes, because it makes us happy.',
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
