/* ============================================================
   WebQ core pro — Midterm Questions Data
   Source: mid_output.md (EXACT text preserved)
   ============================================================ */

const MIDTERM_DATA = {
  moduleId: 'midterm',
  moduleTitle: 'Midterm Exam',
  moduleDescription: 'Midterm exam review covering HTML basics, CSS fundamentals, and web concepts.',

  mcq: [
    {
      id: 'mid-mcq-1',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'Which is the correct CSS syntax?',
      options: [
        'body:color=black',
        '{body;color:black}',
        '{body:color=black(body}',
        'body {color: black}'
      ],
      correctIndex: 3,
      answerText: 'D — body {color: black}'
    },
    {
      id: 'mid-mcq-2',
      type: 'mcq',
      topic: 'HTML Elements',
      question: 'What is the correct HTML for inserting an image?',
      options: [
        '<img alt="MyImage" image.gif /img>',
        '<image src="image.gif" alt="MyImage">',
        '<img src="image.gif" alt="MyImage">',
        '<img href="image.gif" alt="MyImage">'
      ],
      correctIndex: 2,
      answerText: 'C — <img src="image.gif" alt="MyImage">'
    },
    {
      id: 'mid-mcq-3',
      type: 'mcq',
      topic: 'HTML Links',
      question: 'How can you open a link in a new browser window?',
      options: [
        '<a href="url" target="_blank">',
        '<a href="url" target="_self">',
        '<a href="url" target="_new">',
        '<a href="url" target="_window">'
      ],
      correctIndex: 0,
      answerText: 'A — target="_blank"'
    },
    {
      id: 'mid-mcq-4',
      type: 'mcq',
      topic: 'HTML Forms',
      question: 'Which of the following is not an attribute of the <form> tag?',
      options: [
        'Target',
        'Action',
        'URL',
        'Method'
      ],
      correctIndex: 2,
      answerText: 'C — URL'
    },
    {
      id: 'mid-mcq-5',
      type: 'mcq',
      topic: 'CSS Properties',
      question: 'Which CSS property applies a color to text?',
      options: [
        'text-color',
        'foreground-color',
        'background-color',
        'color'
      ],
      correctIndex: 3,
      answerText: 'D — color'
    },
    {
      id: 'mid-mcq-6',
      type: 'mcq',
      topic: 'HTML Links',
      question: 'Which of the following is the correct way of creating a hyperlink in HTML?',
      options: [
        '<a>www.geeksforgeeks.org <Geeksforgeeks /a>',
        '<a href="www.geeksforgeeks.org" Geeksforgeeks /a>',
        '<a href="www.geeksforgeeks.org">Geeksforgeeks</a>',
        '<a link="www.geeksforgeeks.org" Geeksforgeeks></a>'
      ],
      correctIndex: 2,
      answerText: 'C — <a href="www.geeksforgeeks.org">Geeksforgeeks</a>'
    },
    {
      id: 'mid-mcq-7',
      type: 'mcq',
      topic: 'CSS Basics',
      question: 'Which method is ideal for applying the same style to an entire website?',
      options: [
        'Internal CSS',
        'Inline CSS',
        'External CSS',
        'All of the above'
      ],
      correctIndex: 2,
      answerText: 'C — External CSS'
    },
    {
      id: 'mid-mcq-8',
      type: 'mcq',
      topic: 'HTML Basics',
      question: 'The page title is put inside the ........ tag.',
      options: [
        'Body',
        'Head',
        'Division',
        'Table'
      ],
      correctIndex: 1,
      answerText: 'B — Head'
    },
    {
      id: 'mid-mcq-9',
      type: 'mcq',
      topic: 'HTML Forms',
      question: 'Which tag is used for creating a drop-down selection list?',
      options: [
        '<select>',
        '<option>',
        '<dropdown>',
        '<list>'
      ],
      correctIndex: 0,
      answerText: 'A — <select>'
    },
    {
      id: 'mid-mcq-10',
      type: 'mcq',
      topic: 'HTML Frames',
      question: 'For frames in HTML, how do you specify the rest of the screen?',
      options: [
        'Using &',
        'Using $',
        'Using *',
        'Using @'
      ],
      correctIndex: 2,
      answerText: 'C — *'
    }
  ],

  complete: [
    {
      id: 'mid-comp-1',
      type: 'complete',
      topic: 'HTML Forms',
      question: 'To create a drop-down selection list within a form we use the ............ Tag',
      answer: '<select>'
    },
    {
      id: 'mid-comp-2',
      type: 'complete',
      topic: 'CSS Selectors',
      question: 'To apply a style to all <p> tag, we use the selector ............',
      answer: 'Element selector (p)'
    },
    {
      id: 'mid-comp-3',
      type: 'complete',
      topic: 'Web Fundamentals',
      question: 'A web browser is a ............',
      answer: 'Program/software application'
    },
    {
      id: 'mid-comp-4',
      type: 'complete',
      topic: 'HTML Forms',
      question: '<form action="/mailinglist.php" method="post" target="............"> ...... </form>\nThe response is displayed in the same frame',
      answer: '_self'
    },
    {
      id: 'mid-comp-5',
      type: 'complete',
      topic: 'HTML Elements',
      question: '............ is a tag allowing you to put any content in the center of the page',
      answer: '<center>'
    },
    {
      id: 'mid-comp-6',
      type: 'complete',
      topic: 'CSS Selectors',
      question: 'The ............ selector (*) selects all HTML elements on the page',
      answer: 'Universal selector'
    },
    {
      id: 'mid-comp-7',
      type: 'complete',
      topic: 'Web Fundamentals',
      question: '106.29.242.17 is called ............',
      answer: 'IP Address'
    },
    {
      id: 'mid-comp-8',
      type: 'complete',
      topic: 'HTML Frames',
      question: 'In the <frame> tag the ............ attribute is used to provide the URL for the page that will be displayed in the frame',
      answer: 'src'
    },
    {
      id: 'mid-comp-9',
      type: 'complete',
      topic: 'HTML Forms',
      question: 'To define the caption to the fieldset tag we use the ............ Tag',
      answer: '<legend>'
    },
    {
      id: 'mid-comp-10',
      type: 'complete',
      topic: 'HTML Tables',
      question: 'Cellpadding attribute is used for ............',
      answer: 'Defining space between cell content and cell border'
    },
    {
      id: 'mid-comp-11',
      type: 'complete',
      topic: 'HTML Frames',
      question: 'In order to divide your web page to frames; the ................. tag is used.',
      answer: '<frameset>'
    },
    {
      id: 'mid-comp-12',
      type: 'complete',
      topic: 'HTML Basics',
      question: 'In html to change the background color of your page; you use the property .........................',
      answer: 'bgcolor'
    },
    {
      id: 'mid-comp-13',
      type: 'complete',
      topic: 'Web Fundamentals',
      question: 'The Server is defined as .............................................',
      answer: 'A computer/system that provides resources and services to clients'
    },
    {
      id: 'mid-comp-14',
      type: 'complete',
      topic: 'CSS Basics',
      question: '<link href="/media/examples/link-element-example.css" rel="stylesheet"> This tag is used for ....................',
      answer: 'Linking an external CSS stylesheet'
    },
    {
      id: 'mid-comp-15',
      type: 'complete',
      topic: 'CSS Basics',
      question: 'Rules defined in inline CSS takes the .......... Priority.',
      answer: 'Highest priority'
    },
    {
      id: 'mid-comp-16',
      type: 'complete',
      topic: 'CSS Basics',
      question: 'The type of CSS in the following code is ............\n<h1 style="color:blue;">A Blue Heading</h1>',
      answer: 'Inline CSS'
    },
    {
      id: 'mid-comp-17',
      type: 'complete',
      topic: 'CSS Selectors',
      question: 'The type of the selector in the following CSS rule is ...... Selector.\nbody > p { color: #000000; }',
      answer: 'Child Selector'
    },
    {
      id: 'mid-comp-18',
      type: 'complete',
      topic: 'Web Fundamentals',
      question: 'DNS stands for ....................',
      answer: 'Domain Name System'
    },
    {
      id: 'mid-comp-19',
      type: 'complete',
      topic: 'HTML Forms',
      question: '<form action="/mailinglist.php" method="post" target="......">...</form>\nThe response is displayed in new frame',
      answer: '_blank'
    },
    {
      id: 'mid-comp-20',
      type: 'complete',
      topic: 'CSS Selectors',
      question: 'The .......... Selector is used to style HTML elements based on a particular attribute.',
      answer: 'Attribute Selector'
    },
    {
      id: 'mid-comp-21',
      type: 'complete',
      topic: 'Web Fundamentals',
      question: 'A domain name is ..................................',
      answer: 'A unique human-readable name associated with an IP address'
    },
    {
      id: 'mid-comp-22',
      type: 'complete',
      topic: 'Web Fundamentals',
      question: 'HTML Stands for ..................................',
      answer: 'Hyper Text Markup Language'
    },
    {
      id: 'mid-comp-23',
      type: 'complete',
      topic: 'Web Fundamentals',
      question: 'The client is ..................................',
      answer: 'A device or application that requests services from a server'
    },
    {
      id: 'mid-comp-24',
      type: 'complete',
      topic: 'Web Fundamentals',
      question: 'CSS Stands for ..................................',
      answer: 'Cascading Style Sheets'
    }
  ]
};
