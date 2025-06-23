# Currency Converter Chrome Extension

A Chrome extension that seamlessly converts currency values. Built with **SolidJS** for a highly responsive and efficient user interface. The extension provides accurate conversions based on the latest exchange rates.

## Features

- Automatically identifies and converts currency values on web pages.
- Supports multiple currencies with up-to-date exchange rates from trusted APIs.
- Customizable settings to choose your preferred currency.
- Lightweight and fast, leveraging the power of SolidJS for a smooth user experience.

## Tech Stack

- **SolidJS**: Reactive framework for building the user interface.
- **Chrome Extensions API**: Integration with the browser environment.
- **Exchange Rate API (hexarate)**: [(or other API of your choice) for fetching real-time rates.](https://hexarate.paikama.co/)

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/currency-converter-extension.git
    ```
2. Navigate to the project directory:
    ```bash
    cd currency-converter-extension
    ```
3. Install dependencies:
    ```bash
    pnpm install
    ```
4. Build Project:
    ```bash
    pnpm run build
    ```
5. Load the extension in Chrome:
    - Open chrome://extensions in your browser.
    - Enable Developer mode (top-right corner).
    - Click on Load unpacked and select the dist folder from this project.

## Contributing
- Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

# License
- This project is licensed under the MIT License.
