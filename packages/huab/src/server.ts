import { createServer } from "node:http";
import { parse } from "node:url";

const PORT = process.env.PORT || 4096;

const server = createServer((req, res) => {
  // Parse the URL to get pathname and query
  const parsedUrl = parse(req.url || "", true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Set common headers
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle OPTIONS requests for CORS
  if (method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Routing
  if (pathname === "/" && method === "GET") {
    res.writeHead(200);
    res.end("Alive");
  } else {
    // 404 for unknown routes
    res.writeHead(404);
    res.end(
      JSON.stringify({
        error: "Not Found",
        message: `Route ${pathname} not found`,
        availableRoutes: ["/health", "/api/data"],
      }),
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});
