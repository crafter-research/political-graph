import { readdirSync, existsSync } from "fs";
import { join, basename } from "path";

const BRAIN_DIR = join(import.meta.dir, "brain");

const pdfs = readdirSync(BRAIN_DIR).filter(f => f.endsWith(".pdf"));

console.log(`Encontrados ${pdfs.length} PDFs. Convirtiendo...\n`);

let ok = 0, skip = 0, fail = 0;

for (const pdf of pdfs) {
  const pdfPath = join(BRAIN_DIR, pdf);
  const mdName = pdf.replace(/\.pdf$/, ".md");
  const mdPath = join(BRAIN_DIR, mdName);

  if (existsSync(mdPath)) {
    console.log(`⏭  ${pdf} → ya existe, saltando`);
    skip++;
    continue;
  }

  const proc = Bun.spawnSync(
    ["pdftotext", "-enc", "UTF-8", pdfPath, "-"],
    { stdout: "pipe", stderr: "pipe" }
  );

  if (proc.exitCode !== 0) {
    console.error(`✗  ${pdf} → error`);
    fail++;
    continue;
  }

  const text = proc.stdout.toString().trim();
  if (!text) {
    console.log(`⚠  ${pdf} → vacío, saltando`);
    skip++;
    continue;
  }

  const md = `# ${basename(pdf, ".pdf")}\n\n\`\`\`\n${text}\n\`\`\`\n`;
  await Bun.write(mdPath, md);
  console.log(`✓  ${pdf}`);
  ok++;
}

console.log(`\nDone: ${ok} convertidos · ${skip} saltados · ${fail} errores`);
