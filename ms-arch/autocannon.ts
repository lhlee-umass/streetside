import { spawn } from 'child_process'

function runAutocannon(route: string, payload: string) {
  console.log(`\n🚀 Load testing ${route}`)

  const args = [
    '--errors',
    '-c',
    '10', // 10 concurrent connections
    '-d',
    '5', // 5 seconds duration
    '-m',
    'POST', // POST method
    `http://localhost:3000${route}`, // Full URL
    '-b',
    payload, // Request body
    '-H',
    'Content-Type: application/json',
  ]

  const proc = spawn('autocannon', args, { stdio: 'inherit', shell: true })

  proc.on('exit', (code) => {
    if (code !== 0) {
      console.error(`autocannon for ${route} exited with code ${code}`)
    }
  })
}

async function main() {
  const tests: [string, string][] = [
    [
      '/listings',
      JSON.stringify({
        title: 'Chair',
        description: 'Sturdy wooden chair',
        image: 'image.png',
        location: 'UMass Amherst',
        price: 10,
        tags: ['furniture', 'wood'],
        userId: 'user123',
      }),
    ],
    [
      '/messages',
      JSON.stringify({
        content: 'Hey, is this still available?',
        senderId: 'user123',
        receiverId: 'user456',
      }),
    ],
    [
      '/reviews',
      JSON.stringify({
        rating: 5,
        comment: 'Great seller!',
        reviewerId: 'user123',
        revieweeId: 'user456',
      }),
    ],
  ]

  for (const [route, payload] of tests) {
    await new Promise<void>((resolve) => {
      console.log(`\n📦 Sending load to ${route}`)
      const child = spawn(
        'autocannon',
        [
          '--errors',
          '-c',
          '10',
          '-d',
          '5',
          '-m',
          'POST',
          `http://localhost:3000${route}`,
          '-b',
          payload,
          '-H',
          'Content-Type: application/json',
        ],
        { stdio: 'inherit', shell: true }
      )

      child.on('close', resolve)
    })
  }
}

main()
