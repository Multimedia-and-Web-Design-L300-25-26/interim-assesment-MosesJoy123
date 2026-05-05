import { spawn } from "node:child_process";

const processes = [
  {
    name: "frontend",
    command: "npm",
    args: ["run", "dev"],
  },
  {
    name: "backend",
    command: "npm",
    args: ["run", "dev", "--prefix", "backend"],
  },
];

const children = processes.map(({ name, command, args }) => {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", (exitCode) => {
    if (exitCode && exitCode !== 0) {
      console.error(`${name} exited with code ${exitCode}`);
      for (const otherProcess of children) {
        if (otherProcess !== child) {
          otherProcess.kill("SIGINT");
        }
      }
      process.exit(exitCode);
    }
  });

  return child;
});

function stopAllProcesses(signal) {
  for (const child of children) {
    child.kill(signal);
  }
}

process.on("SIGINT", () => {
  stopAllProcesses("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  stopAllProcesses("SIGTERM");
  process.exit(0);
});
