export default function emailTemplate(title: string, contents: string) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>${title}</title>
      </head>

      <body>
        ${contents}
      </body>
    </html>
  `;
}