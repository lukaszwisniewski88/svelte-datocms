/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type {StructuredText as StructuredTextGraphQlResponse, Document} from 'datocms-structured-text-utils'
import { render } from '@testing-library/svelte';
import { StructuredText } from '../../index';

describe('StructuredText', () => {
	describe('with no value', () => {
		it('renders null', () => {
			const { container } = render(StructuredText, { data: null });
			expect(container.querySelector('pre').textContent).toBe('No data document')
			//expect(component).toMatchSnapshot();
		});
	});
});
describe('simple dast /2', () => {
	const structuredText: Document = {
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
							value: 'This\nis a '
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
			const { container } = render(StructuredText, { data: structuredText });
			
			expect(container).toMatchSnapshot();
		});
	});
});
describe("simple dast with no links/blocks", () => {
    const structuredText: StructuredTextGraphQlResponse = {
      value: {
        schema: "dast",
        document: {
          type: "root",
          children: [
            {
              type: "heading",
              level: 1,
              children: [
                {
                  type: "span",
                  value: "This\nis a ",
                },
                {
                  type: "span",
                  marks: ["strong"],
                  value: "title",
                },
              ],
            },
          ],
        },
      },
    };

    describe("with default rules", () => {
      it("renders the document", () => {
        const { container } = render(StructuredText, { data: structuredText });
        expect(container).toMatchSnapshot();
      });
    })})
	describe("with links/blocks", () => {
		type QuoteRecord = {
		  id: string;
		  __typename: "QuoteRecord";
		  quote: string;
		  author: string;
		};
	
		type DocPageRecord = {
		  id: string;
		  __typename: "DocPageRecord";
		  slug: string;
		  title: string;
		};
	
		const structuredText: StructuredTextGraphQlResponse<
		  QuoteRecord | DocPageRecord
		> = {
		  value: {
			schema: "dast",
			document: {
			  type: "root",
			  children: [
				{
				  type: "heading",
				  level: 1,
				  children: [
					{
					  type: "span",
					  value: "This is a",
					},
					{
					  type: "span",
					  marks: ["highlight"],
					  value: "title",
					},
					{
					  type: "inlineItem",
					  item: "123",
					},
					{
					  type: "itemLink",
					  item: "123",
					  meta: [
						{ id: 'target', value: '_blank' },
					  ],
					  children: [{ type: "span", value: "here!" }],
					},
				  ],
				},
				{
					type:'paragraph',
					children:[
						{
							type: 'link',
							url: 'http://www.datocms.com',
							"meta" : [
								{id: 'target', value:'_blank'},
								{id: 'rel', value: 'nofollow'},
							],
							children: [
								{type:'span', value:'Empty link'}
							]
						},
					]
				},
				{
				  type: "block",
				  item: "456",
				},
			  ],
			},
		  },
		  blocks: [
			{
			  id: "456",
			  __typename: "QuoteRecord",
			  quote: "Foo bar.",
			  author: "Mark Smith",
			},
		  ],
		  links: [
			{
			  id: "123",
			  __typename: "DocPageRecord",
			  title: "How to code",
			  slug: "how-to-code",
			},
		  ],
		};

		describe("with default rules", () => {
			it("renders the document", () => {
				const { container } = render(StructuredText, { data: structuredText });
        		expect(container).toMatchSnapshot();
			})
		})
	})