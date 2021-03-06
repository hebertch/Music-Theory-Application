# Music-Theory-Application
Senior Capstone

## IMPORTANT: CODE DOCUMENTATION FOR GRADING
The code is self-documenting and/or commented. Please view the following files/folders for grading purposes.

**Note: Aidan was working from a [different repo](https://github.com/omalleya/fifths) for a period of time between the end of winter term and the middle of spring term. This was done because we found that the original source code setup was not working on android devices so this repo was a copy of the original code which, this time, did work on android devices. It took awhile to get that new source code merged into the main repository so a few of Aidan's commits are in the repo linked above.**

- [src](fifths/src) : The source code
	- [src/components](fifths/src/components): Code for the app pages and menu.
		- [src/components/Menu.js](fifths/src/components/Menu.js): Code for the Sidebar Menu available from all screens.
			- Links to Circle of Fifths Page
			- Links to Composition Page
			- Links to individual Reference pages
		- [src/components/References](fifths/src/components/References): Code for the instructional Reference pages.
			- [src/components/References/index.js](fifths/src/components/References/index.js): 
			Allows for swiping left/right to navigate between reference pages.
			Code for organizing the reference pages for the table of contents (Part of the Sidebar Menu).
			- One file per reference page.
		- [src/components/CircleOfFifthsScreen](fifths/src/components/CircleOfFifthsScreen): Code for the interactive Circle of Fifths Page.
		- [src/components/Composition.js](fifths/src/components/Composition.js): Code for the composition page.		
	- [src/static](fifths/src/static): Files containing constants that may be shared/referenced by a number of components.
	- [src/selectors/keys.js](fifths/src/selectors/keys.js): Calculates fifth notes for given key as well as rotation angles for the Circle of Fifths Page. Selectors work with [reselect](https://github.com/reduxjs/reselect) which builds off of [redux](https://redux.js.org/).
	- [src/actions](fifths/src/actions): Actions are a necessity of redux. Actions are dispatched to redux reducers which in turn, update the applications state. To read more about actions, take a look at the redux [docs](https://redux.js.org/).
	- [src/reducers](fifths/src/reducers): Reducers are also a necessary component of redux. Reducers are where the logic behind changing some of the persistent state in the circle of fifths page is held. To read more about reducers, take a look at the redux [docs](https://redux.js.org/).
- [tests](fifths/__tests__) : Test cases for the algorithms.

## Location of Notable Documents
- Weekly Team Reports: Found in the Blog post sections of the [Final Report](Documents/final-report.pdf)
- Poster: team045.pptx
- Winter Final Progress Report Omitted due to Team-Sensitive nature of documents
- Icons: [fifths](fifths)

## Directory Structure
- [Documents](Documents): Documents handed in for the Capstone class.
  - [requirements](Documents/requirements): Drafts of the Requirements documents
  - [problem-statements](Documents/problem-statement): Individual and Final Problem Statement Assignments
  - [latex-template](Documents/latex-template): Capstone-specific templates for LaTex files
	- [tech-review](Documents/tech-review)
	- [design](Documents/design)
- [notes](notes): Notes for and from meetings.
- [prototypes](prototypes): Prototypes, scans of drawings, and ideas for the app.
  - [compose](prototypes/compose): Web-based prototype of how composing might look/feel in the app.
  - [waves](prototypes/waves): Web-based prototype of how intervals might be explained
    interactively using sound waves.
  - [paper-prototypes](prototypes/paper-prototypes): Scans/Drawings of ideas for designs of the app.
