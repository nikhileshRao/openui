import { OpenAI } from 'openai'

function host() {
	const { hostname, protocol } = window.location
	const port = window.location.port ? `:${window.location.port}` : ''
	return `${protocol}//${hostname}${port}`
}
/* I patched OpenAI here so that users can use basic auth behind a proxy if they want */
class MyOpenAI extends OpenAI {
	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/class-methods-use-this, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
	protected override authHeaders(_opts: any) {
		return {}
	}
}
const openai = new MyOpenAI({
	apiKey: 'sk-fake',
	baseURL: `${host()}/v1`,
	dangerouslyAllowBrowser: true
})

export type Action = 'create' | 'refine'
interface CreateOptions {
	model: string
	systemPrompt: string
	query: string
	temperature: number
	html?: string
	image?: string
	action: Action
}

const localstorageSystemPrompt = window.localStorage.getItem('systemPrompt');

export const systemPrompt = `Objective: Create a UI component that accurately reflects the visual and interactive specifications provided in the Figma design or screenshot.
 
Context: You are a frontend engineer and you are tasked with generating a UI component based on detailed design specifications from either a Figma file or a screenshot. The component should replicate the design’s visual appearance, layout, and behavior as closely as possible. Your designs should be responsive and adaptable across all devices (Desktop/ Mobile/ Tablet). You have to ensure about good code practices including code comments.
 
Dynamic Guidelines:
Component Overview:
Component Name: Identify the component type (e.g., Button, Card, Modal) based on the design.
Design Source Details:
Figma URL (if applicable): If applicable, the Figma design or screenshot will be provided by the user. Additional assets will be provided in the format of link and URL.
Screenshot Details (if applicable): The user will specify about the requirements and you will have to make sure that the requirements and the provided Figma design or image provided by the user matches with the code and design that you will process and generate.
Design Page/Frame (if applicable): If applicable, the user will provide the image size, if not, take reference from the design provided by the user.
Component Specifications:
Dimensions:
Width: If applicable, the user will provide the image width size, if not, take reference from the design provided by the user.
Height: If applicable, the user will provide the image height size, if not, take reference from the design provided by the user.
Buttons:
Border Radius: All the buttons border radius should be of 25px.
Texts in Buttons:  All the texts in the button should be of 18px.
Colors:
Background Color: The user will provide the background code, if not use color codes from the design prompted.
Border Color: Use color codes from the design prompted.
Text Color: The user will specify the text color, if not use color codes from the design prompted.
Hover Color: Use color codes from the design prompted for the hover color.
Active Color: Use color codes from the design prompted for the active color.
Typography:
Font Family: For the font family, use the following google font:
https://fonts.googleapis.com/css2?family=Jersey+25&family=Montaga&family=Playwrite+CU:wght@100..400&display=swap%27);
Font Size:
<h1>
Desktop: 34px
Mobile: 24px
<h2>
Desktop: 30px
Mobile: 22px
<h3>
Desktop: 26px
Mobile: 20px
<h4>
Desktop: 22px
Mobile: 18px
<h5>
Desktop: 18px
Mobile: 16px
<h6>
Desktop: 16px
Mobile: 14px
<p>
Desktop: 16px
Mobile: 14px
<small>
Desktop: 14px
Mobile: 12px
<caption> (typically used for table captions)
Desktop: 14px
Mobile: 12px
<blockquote>
Desktop: 18px (typically styled similarly to paragraphs but with additional indentation or styling)
Mobile: 16px
<pre>
Desktop: 16px (preformatted text often uses the same size as body text but with monospacing)
Mobile: 14px
<code>
Desktop: 14px (inline code or small code snippets)
Mobile: 12px
<strong> / <b>
Desktop: 16px (strong emphasis is typically the same as paragraph text but bold)
Mobile: 14px
<em> / <i>
Desktop: 16px (italic emphasis is typically the same as paragraph text but italicized)
Mobile: 14px
<a> (links)
Desktop: 16px
Mobile: 14px
<label>
Desktop: 16px
Mobile: 14px
Notes:
Responsive Adjustments: These sizes are guidelines and may need adjustment based on specific design needs and responsiveness. Media queries can be used to fine-tune font sizes for different devices.
Accessibility: Ensure that font sizes provide adequate readability and contrast, especially on mobile devices. Consider user preferences and accessibility standards.
Font Weight: 400 or take reference from the uploaded design or the user will specify
Line Height: 46px or take reference from the uploaded design or the user will specify
Letter Spacing: take reference from the uploaded design or the user will specify
Spacing and Layout:
Padding: take reference from the uploaded design or the user will specify
Margin: take reference from the uploaded design or the user will specify
Alignment: take reference from the uploaded design or the user will specify
Flex Properties: [e.g., display: flex; align-items: center; justify-content: center;] (if applicable)
States and Interactions:
Hover State: Change background color to #F0F0F0, add shadow, the user might specify
Active State: Change background color to #D0D0D0, slight inset, shadow, the user might specify
Focus State:  Add border color #007BFF, increase border width else the user might specify
Disabled State: Opacity: 0.5; Cursor: not-allowed
Content:
Text: [e.g., “Submit” or “Click Me”] (Extract text content from the design)
Icon: Include SVG or icon URL, the user might specify size and placement else match it same as the uploaded design.
Accessibility:
ARIA Labels: [e.g., “Submit button”]
Keyboard Navigation: [e.g., Ensure proper tab index and role attributes]
Screen Reader Support: [e.g., Provide aria-live regions if dynamic content]
Implementation Instructions:
Code Generation: Create HTML/CSS/JS or equivalent code reflecting the specifications.
CSS Styles:
Include styles for all states (normal, hover, active, focus, disabled).
Implement media queries for responsiveness as needed.
JavaScript Functionality: If applicable, add interactivity and ensure it aligns with the design.
Responsiveness: Ensure the component adapts to various screen sizes and devices.
Verification Process:
Design Comparison: Compare the generated component against the Figma design or screenshot to ensure accuracy.
Functionality Testing: Validate that all interactive states and behaviors work as intended.
Responsive Design: Check the component’s appearance and functionality across different devices and screen sizes.
Accessibility Testing: Ensure all accessibility features are implemented and functioning.
Documentation:
Discrepancies: Note any differences between the design and the generated component, with explanations if needed.
Code Comments: Include comments in the code to clarify complex or non-standard implementations.
Additional information you must consider:
Wherever an image is detected, use <img /> tag with a proper alt text. The user will specify if there is a background image and will give you the url. Make sure to use the background image in the src in the image tag with the corresponding url.
The code should be desktop and mobile responsive, using media query.
Use the same image provided or the same background image provided and change the size of the image depending whether it is on desktop, tablet or mobile version.
When setting up media queries for responsive design, you typically target different screen sizes to ensure your site looks good on various devices. Here are some common breakpoints for desktop, tablet, and mobile:
Mobile Devices:
Small Mobile (Portrait): max-width: 430px
Large Mobile (Landscape): min-width: 481px and max-width: 767px
Tablets:
Portrait: min-width: 768px and max-width: 1023px
Landscape: min-width: 1024px and max-width: 1279px
Desktops:
Small Desktop: min-width: 1280px and max-width: 1439px
Large Desktop: min-width: 1440px
 
Instructions for Use:
Adapt the component name and specifications based on the actual design you are referencing.
Use the design source details to extract precise measurements, colors, and other specifications.
Ensure that the final component closely matches the provided design in terms of appearance and functionality.
`

const GPT4_MAX_TOKENS = 4096

export async function createOrRefine(
	options: CreateOptions,
	callback: (response: string) => void
) {
	let { model, systemPrompt: sp } = options
	const { temperature, query, html, image, action } = options
	// Add instructions for frontmatter unless we're iterating on existing html
	// Some models don't support this being in a separate system message so we append
	if (!html) {
		sp += `\n\nAlways start your response with frontmatter wrapped in ---.  Set name: with a 2 to 5 word description of the component. Set emoji: with an emoji for the component, i.e.:
---
name: Fancy Button
emoji: 🎉
---

<button class="bg-blue-500 text-white p-2 rounded-lg">Click me</button>\n\n`
	}
	const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
		{
			role: 'system',
			content: localstorageSystemPrompt || sp
		}
	]

	let imageUrl = image ?? ''
	// OpenAI wants a data url, ollama just wants base64 bytes
	// TODO: this can be removed once Ollama OpenAI compat is fixed
	if (image && model.startsWith('ollama/')) {
		const parts = image.toString().split(',')
		imageUrl = parts.pop() ?? ''
	}

	if (action === 'create') {
		// Call the vision models only for creating action
		if (image) {
			// TODO: configurable
			if (model.startsWith('gpt')) {
				model = 'gpt-4o-mini'
			}
			const textImageRequirements = query
				? `The following are some special requirements: \n ${query}`
				: ''
			messages.push({
				role: 'user',
				content: [
					{
						type: 'text',
						text: `This is a screenshot of a web component I want to replicate.  Please generate HTML for it.\n ${textImageRequirements}`
					},
					{
						type: 'image_url',
						image_url: {
							url: imageUrl
						}
					}
				]
			})
		} else {
			messages.push({
				role: 'user',
				content: query
			})
		}
	} else {
		// Annotation comments should like <!--FIX (1): make the image larger-->
		const hasAnnotationComments = /<!--FIX (\(\d+\)): (.+)-->/g.test(
			html as string
		)
		let userPrompt = hasAnnotationComments ? 'Address the FIX comments.' : query
		if (userPrompt === '') {
			userPrompt = 'Lets make this look more professional'
		}

		const instructions = `Given the following HTML${image ? ' and image' : ''}:\n\n${html}\n\n${userPrompt}`
		console.log('Sending instructions:', instructions)
		if (image) {
			// TODO: configurable
			if (model.startsWith('gpt')) {
				model = 'gpt-4o-mini'
			}
			messages.push({
				role: 'user',
				content: [
					{
						type: 'text',
						text: instructions
					},
					{
						type: 'image_url',
						image_url: {
							url: imageUrl
						}
					}
				]
			})
		} else {
			messages.push({
				role: 'user',
				content: instructions
			})
		}
	}

	const response = await openai.chat.completions.create({
		model, // can change to "gpt-4" if you fancy
		messages,
		temperature,
		stream: true,
		max_tokens: GPT4_MAX_TOKENS
	})
	let markdown = ''
	for await (const chunk of response) {
		const part = chunk.choices[0]?.delta?.content ?? ''
		markdown += part
		callback(part)
	}
	return markdown
}

interface ConvertOptions {
	model: string
	temperature: number
	framework: string
	html: string
}

const systemPromptConvert = `You're a frontend web developer that specializes in $FRAMEWORK.
Given html and javascript, generate a $FRAMEWORK component. Factor the code into smaller
components if necessary. Keep all code in one file. Use hooks and put tailwind class strings
that are repeated atleast 3 times into a shared constant. Leave comments when necessary.`

export async function convert(
	options: ConvertOptions,
	callback: (response: string) => void
) {
	const { framework, model, temperature, html } = options

	const systemPromptCompiled = systemPromptConvert.replaceAll(
		'$FRAMEWORK',
		framework
	)
	const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
		{
			role: 'system',
			content: systemPromptCompiled
		}
	]
	/*
  let inputTok = ''
  const encoder = encoding_for_model('gpt-3.5-turbo')
  inputTok += systemPromptCompiled + '\n'
  */
	const userPrompt = `Please turn this into a ${framework} component.`
	const instructions = `Given the following HTML:\n\n${html}\n\n${userPrompt}`
	// inputTok += instructions + '\n'
	messages.push({
		role: 'user',
		content: instructions
	})
	/*
  const tokens = encoder.encode(inputTok)
  encoder.free()
  // TODO: use a bigger model if we're length limited
  */
	const response = await openai.chat.completions.create({
		model,
		messages,
		temperature,
		stream: true
	})
	for await (const chunk of response) {
		callback(chunk.choices[0]?.delta?.content ?? '')
	}
}
