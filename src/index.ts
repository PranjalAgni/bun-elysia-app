import { Elysia } from "elysia";
import { isHtml } from "@elysiajs/html";
import { rateLimit } from "elysia-rate-limit";

const app = new Elysia()
  .use(
    rateLimit({
      duration: 60000,
      max: 10,
      responseMessage: "You have reached the limit, please try later",
    })
  )
  .get(
    "/",
    () => `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f8f8f8;
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
          }
  
          #notion-container {
              max-width: 600px;
              width: 100%;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              overflow: hidden;
          }
  
          .notion-header {
              background-color: #0075cc;
              color: #fff;
              padding: 20px;
              text-align: center;
          }
  
          .notion-content {
              padding: 20px;
              line-height: 1.6;
              color: #333;
          }
  
          #thought {
              font-style: italic;
              color: #555;
          }
  
          #changeThoughtBtn {
              margin-top: 20px;
              padding: 10px;
              background-color: #4CAF50;
              color: white;
              border: none;
              cursor: pointer;
              border-radius: 4px;
          }
      </style>
  </head>
  <body>
  
      <div id="notion-container">
          <div class="notion-header">
              <h1>Random Thoughts</h1>
          </div>
  
          <div class="notion-content">
              <p id="thought">Life is a journey, not a destination.</p>
              <button id="changeThoughtBtn" onclick="changeThought()">Change Thought</button>
          </div>
      </div>
  
      <script>
          function changeThought() {
              const thoughts = [
                  "The only limit is your imagination.",
                  "In the middle of difficulty lies opportunity.",
                  "Success is not final, failure is not fatal: It is the courage to continue that counts."
              ];
  
              const randomIndex = Math.floor(Math.random() * thoughts.length);
              document.getElementById('thought').innerHTML = thoughts[randomIndex];
          }
      </script>
  
  </body>
  </html>`,
    {
      afterHandle({ response, set }) {
        if (isHtml(response))
          set.headers["Content-Type"] = "text/html; charset=utf8";
      },
    }
  )
  .get("/demo", () => "Hello tomorrow is demo (18th Thursday Jan, 2024)")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
