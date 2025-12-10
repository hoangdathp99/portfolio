import { GoogleGenerativeAI } from "@google/generative-ai"
import fs from "fs";
import path from "path";
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // It's recommended to use environment variables
export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

export const tools = [
  {
    functionDeclarations: [
      {
        name: "openLink",
        description:
          "Mở một liên kết (URL) trong trình duyệt của người dùng để điều hướng đến một phần cụ thể của trang web portfolio.",
        parameters: {
          type: "OBJECT",
          properties: {
            url: {
              type: "STRING",
              description:
                "Đường dẫn (URL) đầy đủ hoặc tương đối đến trang hoặc phần của trang web portfolio. Ví dụ: '/projects', '/contact', hoặc 'https://example.com/my-project'.",
            },
          },
          required: ["url"],
        },
      },
    ],
  },
];
// Function to extract content from frontend files
export async function getFrontendContent() {
  let content = "";

  // Các thư mục muốn quét
  const targetDirs = ["app", "components"];

  // Chỉ đọc các file frontend
  const allowed = [".tsx", ".ts", ".jsx", ".js", ".css"];

  function readRecursively(dir: string) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Bỏ qua thư mục build
        if (entry === ".next" || entry === "node_modules") continue;

        readRecursively(fullPath);
      } else {
        if (allowed.some(ext => entry.endsWith(ext))) {
          content += fs.readFileSync(fullPath, "utf8") + "\n";
        }
      }
    }
  }

  try {
    for (const dir of targetDirs) {
      readRecursively(path.join(process.cwd(), dir));
    }
  } catch (err) {
    console.error("Error reading frontend content:", err);
    return null;
  }

  return content;
}
