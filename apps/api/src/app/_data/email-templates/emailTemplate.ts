export default function emailTemplate(title: string, contents: string) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>${title}</title>

        <style>
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@200;300;400;900&display=swap');

          h1, h2, h3, a {
            font-family: "Source Serif Pro", Georgia, serif;
          }

          p {
            font-family: "Open Sans", Arial, sans-serif;
            font-size: 1rem;
            line-height: 1.4;
            max-width: 60ch;
          }

          a {
            font-size: 1rem;
            font-weight: 900;
            line-height: 1.4;
            color: #fe26af !important;
          }

          #sign-off {
            font-style: italic;
          }
        </style>
      </head>

      <body>
        ${contents}
      </body>
    </html>
  `;
}