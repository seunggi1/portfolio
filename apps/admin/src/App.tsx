import { Button } from '@repo/ui/common';
import { useState } from 'react';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<span className="text-5xl text-primary">Test</span>
			</div>
			<h1>Vite + React</h1>
			<Button onClick={() => setCount((count) => count + 1)}>
				count is {count}
			</Button>
		</>
	);
}

export default App;
