<h1 class="sg-h1">UAccount Component Library</h2>

<h2 class="sg-h2 c-sg-accordion js-accordion"><span class="u-icon-angle-right c-sg-accordion__arrow"></span> Usage Guidelines (wip)</h2>

<div class="u-display-none">
	<p class="sg-p">The only elements to have test classes are single use components - header, navigation, footer.</p>
	<p class="sg-p">If markup is shown conditionally via a volt if statement, display all versions (states) of the component.</p>
	<p class="sg-p">Base elements of the component library are styled with their respective tag - <code>&lt;p class=&quot;sg-p&quot;&gt;&lt;/p&gt;</code> to prevent impacting component styles. Components used in the component library (not the components they are presenting) are prefixed as per front end guidelines but use an additional prefix - <code>&lt;div class=&quot;c-sg-comp-name u-sg-utility-name&quot;&gt;&lt;/div&gt;</code>.</p>
</div>

<h2 class="sg-h2 c-sg-accordion js-accordion"><span class="u-icon-angle-right c-sg-accordion__arrow"></span> Features</h2>

<ul class="sg-ul u-display-none">
	<li>interactive modifier list, add the following code below the html example
		<pre class="js-code-highlighter c-sg-code-block html">
		&lt;div class="c-sg-modifier-wrap js-modifier-wrap"&gt;
			&lt;div&gt;
				&lt;button&gt;c-btn-outline--full-width&lt;/button&gt;
			&lt;/div&gt;
			&lt;div&gt;
				&lt;button&gt;c-btn-outline--large&lt;/button&gt;
				&lt;button&gt;c-btn-outline--small&lt;/button&gt;
			&lt;/div&gt;
		&lt;/div&gt;</pre>
		Each div wrapping the buttons acts as their own group. When a button is clicked all modifiers in that group will be removed and the clicked one will be added. These modifiers target the root of the component. To target a child element of a component use the following data attribute:
		<pre class="js-code-highlighter c-sg-code-block html">
		&lt;div class="c-sg-modifier-wrap js-modifier-wrap"&gt;
			&lt;div&gt;
				&lt;button data-target="c-header__logo"&gt;c-header__logo--left&lt;/button&gt;
				&lt;button data-target="c-header__logo"&gt;c-header__logo--right&lt;/button&gt;
			&lt;/div&gt;
		&lt;/div&gt;</pre>
	</li>
	<li>Animation retrigger to preview components animation.</li>
	<li>Parent class addition to style the component wrapper. This is useful for adjusting how a component is presented. For example a white component would need a background color to make it visible. Add the following data attribute with any classes you want adding to the parent <code>data-parent-classes="u-color-1-bg"</code>.</li>
	<li>Show / hide code to reduce page length. The code also has syntax highlighting.</li>
	<li>Copy code button</li>
	<li>Directly link to specific components</li>
	<li>Image src links are changed and updated automatically to map to the main <code>public/</code> folder, no need to change image links to display them in the component library.</li>
	<li>Automatic code formatting with option to not format the code. To do this use <code>data-parent-classes=“js-dont-format”</code> on the root of the component. This is useful for any elements which have style tags applied to them on load, like animation classes, or complex js apps which add data attirbutes to the component when initializing. Showing these could miscommunicate the component default markup</li>
	<li>Full screen toggle with 2 modes, normal full screen and super fullscreen. Super fullscreen is used to view components that are intended to be full viewport width in their true form</li>
</ul>


<h2 class="sg-h2 c-sg-accordion js-accordion"><span class="u-icon-angle-right c-sg-accordion__arrow"></span> General To Do</h2>

<ul class="sg-ul u-display-none">
	<li>Copy code button only working on second click - table layout seems to work though</li>
	<li>Three animation utilities not working</li>
	<li>When clicking on a link to a component in text scroll to it if its on the same page</li>
	<li>when visiting a wrong url, js falls over, can’t press show code anymore - http://localhost:3000/component library/component library-dist/components.html#kakskaskas</li>
</ul>

<div class="l-row l-row--no-vertical-padding">
	<div class="l-col-l-50">
		<h4 class="sg-h4 c-sg-accordion js-accordion"><span class="u-icon-angle-right c-sg-accordion__arrow"></span> Components specific updates</h4>
		<ul class="sg-ul u-display-none">
			<li><a href="grid_system.html#q-common-base-page-layout">Common layout</a> needs validation working</li>
			<li>Current Fees - currently height 0 on table as default</li>
			<li>c-stamp - modifier name is inconsistent 'four-deg' vs 'four-degs' and the modifier name is used in the animation</li>
			<li>limit table - has height:0 and overflow: hidden. Also <code>--last</code> modifier is likely not needed could remove clearfix and do <code>:last-child</code></li>
			<li>current fees - needs js interaction</li>
			<li>reveal label - not working, input validation issues</li>
			<li>main navigation - logged in menu not showing, active classes might not be needed. Could potentially not display this component and only show site-header</li>
			<li>site header + main navigation (logged in) - needs some extra padding bottom for the absolute sub nav</li>
			<li>Flash message needs refactoring to match guidelines (BEM etc)</li>
			<li>Button group - used on landing pages - could be float + margin utility classes as its so few rules (u-margin-right is not in dev yet)</li>
		</ul>
	</div>
	<div class="l-col-l-50">
		<h4 class="sg-h4 c-sg-accordion js-accordion"><span class="u-icon-angle-right c-sg-accordion__arrow"></span> Components not yet done</h4>
		<ul class="sg-ul u-display-none">
			<li>c-card-and-phone-lp</li>
			<li>c-full-page</li>
			<li>c-hero - no longer used - retire it</li>
			<li>c-page-scroll + c-page-scroll-nav don't know if we can display this - it might need its own page</li>
			<li>c-secondary-site-nav - not certain this needs to be in ( homepage last slide nav below interact with us)</li>
			<li>c-signup-form is old and not used anywhere - retire it</li>
		</ul>
	</div>
</div>

<!-- <p class="sg-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora similique inventore maiores at, accusamus qui dolore totam id alias. Molestiae suscipit dolores necessitatibus eius, amet? Ipsum enim deleniti aspernatur blanditiis.</p>

<h2 class="sg-h2">Hello</h2>

<p class="sg-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A eaque modi distinctio laborum repudiandae libero assumenda non animi laudantium ullam. Inventore nemo assumenda consequatur rem non, ab at, ipsum! Perferendis!</p>
<p class="sg-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore voluptatibus debitis magni! Iure totam fugiat magnam, enim voluptates impedit atque maiores delectus rem dolores quas, non facilis alias beatae eligendi.</p>
<h2 class="sg-h2">Hello</h2>
<h2 class="sg-h2">Hello</h2>
<p class="sg-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore voluptatibus debitis magni! Iure totam fugiat magnam, enim voluptates impedit atque maiores delectus rem dolores quas, non facilis alias beatae eligendi.</p> -->
