# Project: Blackwood Mansion - Interactive QR-Based Game

This repository contains the source code for "Blackwood Mansion," an interactive, chapter-based web game that uses QR codes to drive the narrative and gameplay. The experience is built with React and TypeScript, creating an immersive and mysterious adventure for the player.

Players navigate through different chapters, each presenting a set of challenges. The core mechanic involves scanning physical QR codes to reveal story elements, audio clues, and images, which they must then place in the correct sequence to solve the chapter's puzzle.

## Core Features

* **Chapter-Based Narrative:** The game is structured into multiple chapters, each with its own unique story, set of cards, and puzzle sequence.
* **Interactive QR Code Scanning:** Utilizes the `html5-qrcode` library to enable players to scan QR codes using their device's camera. Each scan fetches data from a remote URL to update the game state.
* **Dynamic Content Updates:** Scanning a QR code reveals associated card details, including an image, a name, and a crucial audio clip. This content dynamically updates the placeholder cards displayed on the screen.
* **3D Card Carousel:** A visually engaging 3D carousel, powered by `react-spring-3d-carousel`, is used to display the interactive cards. Players can swipe or navigate through the cards.
* **Sequence-Based Puzzles:** The primary objective in each chapter is to scan all the cards and arrange them in the correct order. The application validates the player's sequence against a predefined correct order.
* **State Management with Context:** The application uses React's Context API (`CardContext`, `ScreenVisibilityContext`) to manage global state, including the current screen, card data, and the player's progress in the card sequence.
* **Immersive Theming:** The UI is styled with `styled-components` to create a spooky, horror-themed atmosphere, complete with custom fonts, animations (`react-type-animation`, `keyframes`), and a fitting color palette.
* **Responsive Modals:** Card details and the QR scanner are presented in clean, responsive modals (`react-modal`) for a seamless user experience.

## How It Works

1.  **Game Start:** The player begins at a main menu and starts the game, progressing to the first chapter.
2.  **Card Interaction:** In each chapter, the player is presented with a carousel of placeholder cards.
3.  **QR Scanning:** The player clicks a card to open a QR scanner modal. They must scan the corresponding physical QR code.
4.  **Data Fetching:** Upon a successful scan, the application fetches JSON data from the URL encoded in the QR code.
5.  **Unlocking Clues:** The fetched data updates the selected card with its true image and name. Simultaneously, an associated audio clue is played automatically.
6.  **Building the Sequence:** A modal appears showing the card's details, offering the player an option to "Add to Sequence."
7.  **Solving the Puzzle:** After all cards for the chapter have been scanned and added to the sequence, the player can submit their order.
8.  **Validation:** The application checks if the player's sequence matches the correct order for that chapter and alerts the player to the result.

## Key Components

* `Chapter[2|3].tsx`: The main component for each game chapter. It manages the state for the card carousel, the QR scanner modal, the fetched card data, and the user's sequence.
* `MainPage.tsx`: The main menu or landing page for the application, which introduces the game and leads the player to the first chapter.
* `ScreenVisibilityContext.tsx`: A React context provider that manages which screen or component is currently visible to the user (e.g., splash screen, main menu, or a specific chapter).
* `CardContext.tsx`: A global state manager that holds the data for all card sets, the correct sequence for each puzzle, and the functions to validate the player's input.
* `QrReader.tsx`: A reusable wrapper component for the `Html5QrcodeScanner` library, simplifying its integration into the chapter components.

## Technologies Used

* **Frontend:** React, TypeScript
* **Styling:** `styled-components`
* **Animation:** `react-spring-3d-carousel`, `react-type-animation`, `Framer Motion` (implied by `AnimatedDiv`)
* **State Management:** React Context API
* **QR Scanning:** `html5-qrcode`
* **UI Components:** `react-modal`
* **Gesture Handling:** `@use-gesture/react`

