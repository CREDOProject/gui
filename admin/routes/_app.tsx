import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>admin</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-gray-50">
        <div class="p-4 mx-auto max-w-7xl">
          <nav class="mb-8">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">
              Home
            </a>
          </nav>
          <Component />
        </div>
      </body>
    </html>
  );
}
