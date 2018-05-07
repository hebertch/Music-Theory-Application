# Music-Theory-Application
Senior Capstone

## IMPORTANT: CODE DOCUMENTATION FOR GRADING
The code is self-documenting and/or commented. Please view the following files/folders for grading purposes.

- [src](fifths/src) : The source code
	- [src/components](fifths/src/components): Code for the app pages and menu.
		- [src/components/Menu.js](src/components/Menu.js): Code for the Sidebar Menu available from all screens.
			- Links to Circle of Fifths Page
			- Links to Composition Page
			- Links to individual Reference pages
		- [src/components/References](src/components/References): Code for the instructional Reference pages.
			- [src/components/References/index.js](src/components/References/index.js): 
			Allows for swiping left/right to navigate between reference pages.
			Code for organizing the reference pages for the table of contents (Part of the Sidebar Menu).
			- One file per reference page.
		- [src/components/CircleOfFifthsScreen](src/components/CircleOfFifthsScreen): Code for the interactive Circle of Fifths Page.
		- [src/components/Composition.js](src/components/Composition.js): Code for the composition page.		
	- [src/static](fifths/src/static): Files containing constants that may be shared/referenced by a number of components.
	- [src/selectors/keys.js](fifths/src/selectors/keys.js): Calculates fifth notes for given key as well as rotation angles for the Circle of Fifths Page. Selectors work with [reselect](https://github.com/reduxjs/reselect) which builds off of [redux](https://redux.js.org/).
	- [src/actions](fifths/src/actions): Actions are a necessity of redux. Actions are dispatched to redux reducers which in turn, update the applications state. To read more about actions, take a look at the redux [docs](https://redux.js.org/).
	- [src/reducers](fifths/src/reducers): Reducers are also a necessary component of redux. Reducers are where the logic behind changing some of the persistent state in the circle of fifths page is held. To read more about reducers, take a look at the redux [docs](https://redux.js.org/).
- [tests](fifths/__tests__) : Test cases for the algorithms.

## Music Theory Terms Quick Reference:
- Tone: A-G with any number of # (sharps) or b (flats)
- TODO (For Behn)
	
## Links of Interest to the Grader:
- 12/01/17 [Design Doc](Documents/design)
- 11/13/17 [Tech Reviews](Documents/tech-review)
	- [hebertch](Documents/tech-review/hebertch)
- 11/13/17 [Final Draft of Requirements](Documents/requirements/final-draft)
- 10/27/17 [Rough Draft of Requirements](Documents/requirements/rough-draft)
- 10/19/17 [Final Draft of Problem Statement](Documents/problem-statement/final-draft)
  - [hebertch](Documents/problem-statement/hebertch)
  - [omalleya](Documents/problem-statement/omalleya)
  - [buckleka](Documents/problem-statement/buckleka)

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
