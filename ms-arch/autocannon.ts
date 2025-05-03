import { spawn } from 'child_process';

function runAutocannon(route: string) {
  console.log(`\n🔥 Load testing ${route}`);

  const args = [
    '-c', '10',
    '-d', '5',
    '-m', 'POST',
    `http://localhost:3000${route}`,
    '-b', '{"message":"load test"}',
    '-H', 'Content-Type: application/json'
  ];

  const proc = spawn('autocannon', args, { stdio: 'inherit', shell: true });

  proc.on('exit', (code) => {
    if (code !== 0) {
      console.error(`autocannon for ${route} exited with code ${code}`);
    }
  });
}

function main() {
  const routes = ['/a', '/b'];

  // Run sequentially to avoid overlapping load
  const runSequentially = async () => {
    for (const route of routes) {
      await new Promise<void>((resolve) => {
        console.log(`Running autocannon on route ${route}.`)
        const child = spawn('autocannon', [
          '--errors',
          '-c', '10',
          '-d', '5',
          '-m', 'POST',
          `http://localhost:3000${route}`,
          '-b', '{"message":"load test"}',
          '-H', 'Content-Type: application/json'
        ], { stdio: 'inherit', shell: true });

        child.on('close', resolve);
      });
    }
  };

  runSequentially();
}

main();
