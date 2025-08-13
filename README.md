# dap-timer

A lightweight timer utility for Node.js environments, offering functionality similar to `console.time` and `console.timeEnd`.

---

## Features

- **Timing**: Measure elapsed time.
- **Simple API**: Easy-to-use interface for developers.
- **Lightweight**: Minimalistic design with no external dependencies.

---

## Installation

To install via npm:

```bash
npm install @kingdanx/dap-timer
```

To install via bun:

```bash
bun add dap-timer
```

---

## Usage

```javascript
import Timer from 'dap-timer';

const timer = new Timer();

timer.time('label');

await someAsyncOperation();

const duration = timer.endTime('label');

console.log(duration);
```

---

## License

MIT License – see the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any improvements or fixes.
