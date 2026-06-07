/* ============================================================
   WebQ core pro — Questions Bank Data
   Source: mcq_output.md (EXACT text preserved)
   ============================================================ */

const QUESTIONS_DATA = {
  moduleId: 'questions',
  moduleTitle: 'Questions Bank',
  moduleDescription: 'Comprehensive CSS & HTML question bank for practice and review.',

  mcq: [
    {
      id: 'q-mcq-1',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which of the following property adds padding to the top of an element?',
      options: [
        'height',
        'padding-height',
        'top',
        'padding-top'
      ],
      correctIndex: 3,
      answerText: 'D. padding-top'
    },
    {
      id: 'q-mcq-2',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which of the following display property value is described by treats the element as inline?',
      options: [
        'inline-block',
        'list-item',
        'block',
        'inline'
      ],
      correctIndex: 3,
      answerText: 'D. inline'
    },
    {
      id: 'q-mcq-3',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'What does CSS stand for?',
      options: [
        'Creative Style Sheets',
        'Colorful Style Sheets',
        'Cascading Style Sheets',
        'Computer Style Sheets'
      ],
      correctIndex: 2,
      answerText: 'C. Cascading Style Sheets'
    },
    {
      id: 'q-mcq-4',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'What is the correct HTML for referring to an external style sheet?',
      options: [
        '<stylesheet>mystyle.css</stylesheet />',
        '<style src="mystyle.css" />',
        '<link rel="stylesheet" type="text/css" href="mystyle.css">'
      ],
      correctIndex: 2,
      answerText: 'C. <link rel="stylesheet" type="text/css" href="mystyle.css">'
    },
    {
      id: 'q-mcq-5',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'Where in an HTML document is the correct place to refer to an external style sheet?',
      options: [
        'At the end of the document',
        'In the <head> section',
        'At the top of the document',
        'In the <body> section'
      ],
      correctIndex: 1,
      answerText: 'B. In the <head> section'
    },
    {
      id: 'q-mcq-6',
      type: 'mcq',
      topic: 'HTML Elements',
      question: 'Which HTML tag is used to define an internal style sheet?',
      options: [
        '<style>',
        '<css>',
        '<script>'
      ],
      correctIndex: 0,
      answerText: 'A. <style>'
    },
    {
      id: 'q-mcq-7',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'Which is the correct CSS syntax?',
      options: [
        'body {color: black}',
        '{body;color:black}',
        '{body:color=black(body}',
        'body:color=black'
      ],
      correctIndex: 0,
      answerText: 'A. body {color: black}'
    },
    {
      id: 'q-mcq-8',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'How do you insert a comment in a CSS file?',
      options: [
        '// this is a comment //',
        '/* this is a comment */',
        '\' this is a comment',
        '// this is a comment'
      ],
      correctIndex: 1,
      answerText: 'B. /* this is a comment */'
    },
    {
      id: 'q-mcq-9',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which property is used to change the background color?',
      options: [
        'bgcolor:',
        'background-color:',
        'color:'
      ],
      correctIndex: 1,
      answerText: 'B. background-color'
    },
    {
      id: 'q-mcq-10',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'How do you add a background color for all <h1> elements?',
      options: [
        'all.h1 {background-color:#FFFFFF}',
        'h1.all {background-color:#FFFFFF}',
        'h1 {background-color:#FFFFFF}'
      ],
      correctIndex: 2,
      answerText: 'C. h1 {background-color:#FFFFFF}'
    },
    {
      id: 'q-mcq-11',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'How do you change the text color of an element?',
      options: [
        'text-color=',
        'fgcolor:',
        'color:',
        'text-color:'
      ],
      correctIndex: 2,
      answerText: 'C. color'
    },
    {
      id: 'q-mcq-12',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which CSS property controls the text size?',
      options: [
        'font-size',
        'font-style',
        'text-style',
        'text-size'
      ],
      correctIndex: 0,
      answerText: 'A. font-size'
    },
    {
      id: 'q-mcq-13',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'What is the correct CSS syntax for making all the <p> elements bold?',
      options: [
        '<p style="text-size:bold">',
        'p {font-weight:bold}',
        'p {text-size:bold}',
        '<p style="font-size:bold">'
      ],
      correctIndex: 1,
      answerText: 'B. p {font-weight:bold}'
    },
    {
      id: 'q-mcq-14',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'How do you display hyperlinks without an underline?',
      options: [
        'a {text-decoration:no underline}',
        'a {decoration:no underline}',
        'a {text-decoration:none}',
        'a {underline:none}'
      ],
      correctIndex: 2,
      answerText: 'C. a {text-decoration:none}'
    },
    {
      id: 'q-mcq-15',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'How do you make each word in a text start with a capital letter?',
      options: [
        'text-transform:capitalize',
        'You can\'t do that with CSS',
        'text-transform:uppercase'
      ],
      correctIndex: 0,
      answerText: 'A. text-transform:capitalize'
    },
    {
      id: 'q-mcq-16',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'How do you change the font of an element?',
      options: [
        'font-family:',
        'font=',
        'f:'
      ],
      correctIndex: 0,
      answerText: 'A. font-family'
    },
    {
      id: 'q-mcq-17',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'How do you make the text bold?',
      options: [
        'font:b',
        'font-weight:bold',
        'style:bold'
      ],
      correctIndex: 1,
      answerText: 'B. font-weight:bold'
    },
    {
      id: 'q-mcq-18',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'How do you display a border like this:\nTop = 10px\nBottom = 5px\nLeft = 20px\nRight = 1px',
      options: [
        'border-width:10px 20px 5px 1px',
        'border-width:10px 1px 5px 20px',
        'border-width:5px 20px 10px 1px',
        'border-width:10px 5px 20px 1px'
      ],
      correctIndex: 1,
      answerText: 'B. border-width:10px 1px 5px 20px'
    },
    {
      id: 'q-mcq-19',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'How do you change the left margin of an element?',
      options: [
        'margin:',
        'indent:',
        'margin-left:',
        'text-indent:'
      ],
      correctIndex: 2,
      answerText: 'C. margin-left'
    },
    {
      id: 'q-mcq-20',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'How do you make a list that lists its items with squares?',
      options: [
        'list-type: square',
        'type: square',
        'type: 2',
        'list-style-type: square'
      ],
      correctIndex: 3,
      answerText: 'D. list-style-type: square'
    },
    {
      id: 'q-mcq-21',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which property is used to make a font italic?',
      options: [
        'font-family',
        'font-style',
        'font-variant',
        'font-weight'
      ],
      correctIndex: 1,
      answerText: 'B. font-style'
    },
    {
      id: 'q-mcq-22',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which property is used to align the text of a document?',
      options: [
        'text-indent',
        'text-align',
        'text-decoration',
        'text-transform'
      ],
      correctIndex: 1,
      answerText: 'B. text-align'
    },
    {
      id: 'q-mcq-23',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'Which property of an anchor element signifies unvisited hyperlinks?',
      options: [
        ':link',
        ':visited',
        ':hover',
        ':active'
      ],
      correctIndex: 0,
      answerText: 'A. :link'
    },
    {
      id: 'q-mcq-24',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which property of a table element specifies the width that should appear between table cells?',
      options: [
        'border-collapse',
        'border-spacing',
        'caption-side',
        'empty-cells'
      ],
      correctIndex: 1,
      answerText: 'B. border-spacing'
    },
    {
      id: 'q-mcq-25',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'In what form are style rules presented?',
      options: [
        'selector { property: value }',
        'selector { property= value }',
        'selector ( property: value )',
        'selector ( property= value )'
      ],
      correctIndex: 0,
      answerText: 'A. selector { property: value }'
    },
    {
      id: 'q-mcq-26',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'What does the ID selector do?',
      options: [
        'Apply the style to a specific element',
        'Apply the style to all elements',
        'Apply the style to a group of elements',
        'Apply the style to elements of the same type'
      ],
      correctIndex: 0,
      answerText: 'A. Apply the style to a specific element'
    },
    {
      id: 'q-mcq-27',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'What selector should you use when applying a style to multiple elements?',
      options: [
        'ID',
        'Class',
        'Type',
        'Any of the above'
      ],
      correctIndex: 1,
      answerText: 'B. Class'
    },
    {
      id: 'q-mcq-28',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'Which method is ideal for applying the same style to an entire website?',
      options: [
        'Internal CSS',
        'External CSS'
      ],
      correctIndex: 1,
      answerText: 'B. External CSS'
    },
    {
      id: 'q-mcq-29',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'a:hover and a:active are examples of:',
      options: [
        'pseudo-classes',
        'attribute selectors',
        'ids',
        'selectors'
      ],
      correctIndex: 0,
      answerText: 'A. Pseudo-classes'
    },
    {
      id: 'q-mcq-30',
      type: 'mcq',
      topic: 'CSS Layout',
      question: 'From the inside out, what is the correct order of the CSS box model?',
      options: [
        'margin, border, padding, content',
        'content, margin, border, padding',
        'border, margin, content, padding',
        'content, padding, border, margin',
        'padding, content, margin, border'
      ],
      correctIndex: 3,
      answerText: 'D. Content → Padding → Border → Margin'
    },
    {
      id: 'q-mcq-31',
      type: 'mcq',
      topic: 'CSS Layout',
      question: 'What is the difference between margins and padding?',
      options: [
        'margins add whitespace inside the border and padding outside',
        'padding adds whitespace and margins increase border size',
        'there is no difference',
        'margins add whitespace and padding increases border size',
        'padding adds whitespace inside the border and margins add whitespace outside'
      ],
      correctIndex: 4,
      answerText: 'E. Padding adds whitespace inside the border and margins add whitespace outside'
    },
    {
      id: 'q-mcq-32',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which color format uses rgb followed by three numbers between 0 and 255?',
      options: [
        'RGB Color',
        'RGBa Color',
        'HSL Color',
        'HSLa Color'
      ],
      correctIndex: 0,
      answerText: 'A. RGB Color'
    },
    {
      id: 'q-mcq-33',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which property sets the width of an element\'s complete border?',
      options: [
        'border-width',
        'width',
        'border-depth',
        'none of the above'
      ],
      correctIndex: 0,
      answerText: 'A. border-width'
    },
    {
      id: 'q-mcq-34',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which CSS property determines how overflowed content is signaled to users?',
      options: [
        'text-flow',
        'text-underflow',
        'text-overflow',
        'none of the above'
      ],
      correctIndex: 2,
      answerText: 'C. text-overflow'
    },
    {
      id: 'q-mcq-35',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which property allows you to specify the width, style and color of a border in one property?',
      options: [
        'border',
        'border-style',
        'border-left',
        'none of the above'
      ],
      correctIndex: 0,
      answerText: 'A. border'
    },
    {
      id: 'q-mcq-36',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'Which selector selects direct descendants?',
      options: [
        'E > F',
        'E F',
        'E + F',
        'E ~ F'
      ],
      correctIndex: 0,
      answerText: 'A. E > F'
    },
    {
      id: 'q-mcq-37',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'Which selector selects any tag with an id attribute set?',
      options: [
        'E#id',
        '.class',
        '#id',
        '*'
      ],
      correctIndex: 2,
      answerText: 'C. #id'
    },
    {
      id: 'q-mcq-38',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which property is used to control the space between the border and content in a table?',
      options: [
        'border',
        'margin',
        'padding',
        'resize'
      ],
      correctIndex: 2,
      answerText: 'C. padding'
    },
    {
      id: 'q-mcq-39',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'In CSS, what can h1 be called?',
      options: [
        'Selector',
        'Attribute',
        'Value',
        'Tag'
      ],
      correctIndex: 0,
      answerText: 'A. Selector'
    },
    {
      id: 'q-mcq-40',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'In CSS, what can color:red be called?',
      options: [
        'Selector',
        'Rule',
        'Declaration',
        'None of the above'
      ],
      correctIndex: 2,
      answerText: 'C. Declaration'
    },
    {
      id: 'q-mcq-41',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'Which attributes are used to specify elements to bind style rules to?',
      options: [
        'id',
        'class',
        'tag',
        'all of the mentioned'
      ],
      correctIndex: 3,
      answerText: 'D. All of the mentioned'
    },
    {
      id: 'q-mcq-42',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'Which selectors specify a rule to bind to a particular unique element?',
      options: [
        'id',
        'class',
        'tag',
        'both (B) and (C)'
      ],
      correctIndex: 0,
      answerText: 'A. id'
    },
    {
      id: 'q-mcq-43',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'Which selectors specify a group of elements?',
      options: [
        'id',
        'class',
        'tag',
        'both (B) and (C)'
      ],
      correctIndex: 1,
      answerText: 'B. class'
    },
    {
      id: 'q-mcq-44',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which CSS property defines all four sides of an element\'s border in one declaration?',
      options: [
        'border',
        'padding',
        'border-collapse',
        'border-width'
      ],
      correctIndex: 0,
      answerText: 'A. border'
    },
    {
      id: 'q-mcq-45',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which text-decoration value places a line above text?',
      options: [
        'line',
        'underline',
        'overline',
        'blink'
      ],
      correctIndex: 2,
      answerText: 'C. overline'
    },
    {
      id: 'q-mcq-46',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'Which selector selects adjacent siblings?',
      options: [
        'E > F',
        'E F',
        'E + F',
        'E ~ F'
      ],
      correctIndex: 2,
      answerText: 'C. E + F'
    },
    {
      id: 'q-mcq-47',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'Which selector selects specified elements of type E with a particular class value?',
      options: [
        'E.class',
        'E ~ F',
        '*',
        'E, F, G'
      ],
      correctIndex: 0,
      answerText: 'A. E.class'
    },
    {
      id: 'q-mcq-48',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'What will happen in this case?\np strong {background-color: yellow;}',
      options: [
        'Strong have yellow background',
        'Strong element within a p element have a yellow background',
        'Both p and strong have yellow background',
        'None of the mentioned'
      ],
      correctIndex: 1,
      answerText: 'B. Strong element within a p element has a yellow background'
    },
    {
      id: 'q-mcq-49',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'Which selector is specified using the plus sign (+) and selects sibling elements?',
      options: [
        'class selectors',
        'attribute selectors',
        'adjacent-sibling selector',
        'none of the mentioned'
      ],
      correctIndex: 2,
      answerText: 'C. adjacent-sibling selector'
    },
    {
      id: 'q-mcq-50',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which property associates a background image with an element?',
      options: [
        'image',
        'background-image',
        'float',
        'none of the mentioned'
      ],
      correctIndex: 1,
      answerText: 'B. background-image'
    },
    {
      id: 'q-mcq-51',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which CSS property sets the opacity level for an element?',
      options: [
        'opacity',
        'transparency',
        'transparent',
        'all of the mentioned'
      ],
      correctIndex: 0,
      answerText: 'A. opacity'
    },
    {
      id: 'q-mcq-52',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which CSS property repeats an image both horizontally and vertically?',
      options: [
        'background',
        'background-image',
        'background-repeat',
        'background-position'
      ],
      correctIndex: 2,
      answerText: 'C. background-repeat'
    },
    {
      id: 'q-mcq-53',
      type: 'mcq',
      topic: 'CSS Selectors',
      question: 'Which selector is used when you place the mouse over an element?',
      options: [
        'focus',
        'hover',
        'mouse',
        'all of the mentioned'
      ],
      correctIndex: 1,
      answerText: 'B. hover'
    }
  ],

  short: [
    {
      id: 'q-short-54',
      type: 'short',
      topic: 'HTML Elements',
      question: 'What tag is used to display a picture in an HTML page?',
      answer: '<img>'
    },
    {
      id: 'q-short-55',
      type: 'short',
      topic: 'HTML Elements',
      question: 'Which HTML tag produces the biggest heading?',
      answer: '<h1>'
    },
    {
      id: 'q-short-56',
      type: 'short',
      topic: 'HTML Lists',
      question: 'Which tag is used to create a numbered list?',
      answer: '<ol>'
    },
    {
      id: 'q-short-57',
      type: 'short',
      topic: 'HTML Links',
      question: 'What is the correct HTML for creating a hyperlink?',
      answer: '<a href="url">Text</a>'
    },
    {
      id: 'q-short-58',
      type: 'short',
      topic: 'HTML Links',
      question: 'How can you create an e-mail link?',
      answer: '<a href="mailto:name@example.com">Email</a>'
    },
    {
      id: 'q-short-59',
      type: 'short',
      topic: 'HTML Links',
      question: 'How can you open a link in a new browser window?',
      answer: 'target="_blank"'
    },
    {
      id: 'q-short-60',
      type: 'short',
      topic: 'HTML Tables',
      question: 'Which of these tags are all table tags?',
      answer: '<table>, <tr>, <td>'
    },
    {
      id: 'q-short-61',
      type: 'short',
      topic: 'HTML Elements',
      question: 'What is the correct HTML tag for inserting a line break?',
      answer: '<br>'
    },
    {
      id: 'q-short-62',
      type: 'short',
      topic: 'HTML Basics',
      question: 'What are meta tags used for?',
      answer: 'Metadata about the document (SEO, charset, description, keywords, viewport, etc.)'
    },
    {
      id: 'q-short-63',
      type: 'short',
      topic: 'HTML Basics',
      question: 'What is the preferred way for adding a background color in HTML?',
      answer: 'CSS (background-color)'
    },
    {
      id: 'q-short-64',
      type: 'short',
      topic: 'HTML Elements',
      question: 'Apart from <b> tag, what other tag makes text bold?',
      answer: '<strong>'
    },
    {
      id: 'q-short-65',
      type: 'short',
      topic: 'HTML Lists',
      question: 'How can you make a bulleted list with numbers?',
      answer: 'Use an ordered list <ol>'
    },
    {
      id: 'q-short-66',
      type: 'short',
      topic: 'HTML Basics',
      question: 'Markup tags tell the web browser?',
      answer: 'How content should be structured and displayed'
    },
    {
      id: 'q-short-67',
      type: 'short',
      topic: 'HTML Basics',
      question: 'HTML uses?',
      answer: 'Tags (markup elements enclosed in < >)'
    }
  ]
};
