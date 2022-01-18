import type {
	Document,
	StructuredText as StructuredTextGraphQlResponse
} from 'datocms-structured-text-utils';
import { render, cleanup, screen } from '@testing-library/svelte';
import StructuredText from '../StructuredText.svelte';

afterEach(() => {
	cleanup();
});
describe('Structured text with no value', () => {
	it('renders null', () => {
		const { container } = render(StructuredText, {
			props: {
				data: null
			}
		});
		expect(container.querySelector('pre')?.textContent).toBe('No data document');
	});
});
describe('simple dast', () => {
	const structuredText: Document = {
		schema: 'dast',
		document: {
			type: 'root',
			children: [
				{
					type: 'heading',
					level: 2,
					children: [
						{
							type: 'span',
							value: 'This is a '
						},
						{
							type: 'span',
							marks: ['strong'],
							value: 'title'
						}
					]
				}
			]
		}
	};
	describe('with default rules', () => {
		it('renders the document', () => {
			const { getByRole } = render(StructuredText, { data: structuredText });
			const heading = getByRole('heading', {
				level: 2
			});
			expect(heading.querySelector('strong')).toBeDefined();
			expect(heading.querySelector('strong')?.textContent).toContain('title');

			expect(heading.textContent).toContain('This is a title');
		});
	});
});

describe('with links/blocks', () => {
	type QuoteRecord = {
		id: string;
		__typename: 'QuoteRecord';
		quote: string;
		author: string;
	};

	type DocPageRecord = {
		id: string;
		__typename: 'DocPageRecord';
		slug: string;
		title: string;
	};

	const structuredText: StructuredTextGraphQlResponse<QuoteRecord | DocPageRecord> = {
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
								marks: ['highlight'],
								value: 'title'
							},
							{
								type: 'inlineItem',
								item: '123'
							},
							{
								type: 'itemLink',
								item: '123',
								meta: [{ id: 'target', value: '_blank' }],
								children: [{ type: 'span', value: 'here!' }]
							}
						]
					},
					{
						type: 'paragraph',
						children: [
							{
								type: 'link',
								url: 'http://www.datocms.com',
								meta: [
									{ id: 'target', value: '_blank' },
									{ id: 'rel', value: 'nofollow' }
								],
								children: [{ type: 'span', value: 'Empty link' }]
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
	};

	describe('with default rules', () => {
		it('renders the document', () => {
			const { getByRole } = render(StructuredText, { data: structuredText });
			//expect(container).toMatchSnapshot();
			screen.logTestingPlaygroundURL();
			expect(getByRole('heading', { level: 1 })).toBeDefined();
			// TODO !!!
		});
	});
});
