# Installation

Run the following commands

- Clone the application from https://github.com/carlosmarinho/react-tanstack-client

  ```
  git clone https://github.com/carlosmarinho/react-tanstack-client
  ```

- Get into the cloned application folder

  ```
  cd react-tanstack-client
  ```

- Run npm install to install the package dependancy

  ```
  npm install
  ```

  ```
  npm run start
  ```

The last command (npm run servers) will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# URLs to access the aplication

- I have published the frontend and the backend on Heroku, so you don't need to install the application to see it running, just access the following website

## Website

List Client: This feature, implemented in ListClient, allows you to view all clients stored in the application. It retrieves the client data from the session storage and displays it in a user-friendly format.

Add Client: This feature is implemented in AddClientPage. It provides a form for entering new client data. Upon submission, the data is validated using the ClientSchema from clientSchema.ts, and if valid, it is added to the session storage and the client map in storageUtils.ts.

Edit Client: This feature, found in EditClientPage, allows you to modify the details of an existing client. It uses the client's ID to retrieve the current data, displays it in a form for editing, and updates the session storage and the client map upon submission. The client ID is obtained from the URL, as set up in the routing in App.tsx.

### Local

- Open [http://localhost:3000](http://localhost:3000)

# Tecnologies used

While I have substantial experience with Redux and GraphQL client, I've also spent over 2 years gaining proficiency in Tanstack React Query, which I've effectively utilized in this project.

- Vite: https://vitejs.dev
- tanstack/react-query
- Jest: https://jestjs.io
- HTML / CSS / Javascript ES6+;
- Typescript: https://www.typescriptlang.org;
- React: https://reactjs.org
- React Hooks: https://react.dev;
- React Router: https://reactrouter.com/en/main;
- React Query: https://tanstack.com/query/v4;
- React Hook Form: https://react-hook-form.com;
- MSW: https://mswjs.io;
- Zod: https://zod.dev;
- Styled Components: https://styled-components.com;
- React Testing Library / Jest: https://testing-library.com;
- Vite (básico): https://vitejs.dev;
- MUI (básico): https://mui.com;
- pnpm (básico): https://pnpm.io;

# About the application

## Development

- I started developing the application using React, Tanstack React Query, and Styled Components. Instead of using a traditional backend, I utilized MSW (Mock Service Worker) to mock the backend. The application is primarily focused on client management, allowing users to list, add, and edit clients. Despite the time constraints, I managed to implement almost 100% of unit tests and a bit of integration tests.
- I decided to use all these technologies as they were prerequisites of the test, and to demonstrate how I can develop a real-world application using them.

## Refactory (@todo)

### layouts

- The application features a simple yet effective layout structure, designed for ease of use and adaptability. The layout consists of a top menu for navigation and a middle container for content display. This structure is designed to easily accommodate changes and additions. It provides the flexibility to implement multiple layouts, catering to different needs and functionalities within the application.

### Hooks

- `useAddClient.ts`: This custom hook is used to handle the addition of new clients. It encapsulates the logic for validating and storing new client data.

- `useClients`: This custom hook is responsible for managing the state and operations related to clients. It provides functions for fetching, and deleting clients.

- `useEditClients`: This custom hook is used to handle the editing of existing clients. It encapsulates the logic for fetching the current client data, validating the updated data, and storing the updated client data.

- `useFetchClients`: This custom hook is responsible for fetching the list of clients. It encapsulates the logic for making the API request to fetch the clients and managing the request state.

### Tanstack

- The current setup of the Tanstack React Query store serves the basic needs of this small-scale application quite well. It provides a straightforward and efficient way to manage data fetching and state management. However, for larger or more complex applications, it would be beneficial to refine this setup. This could include optimizing caching strategies and query configurations to ensure more efficient data fetching and state management. By doing so, we can improve the reusability of queries across the application, leading to cleaner code and better performance.

### CSS styled components

- My typical approach is to encapsulate the CSS within the component itself for better cohesion and readability. However, when the CSS code becomes extensive, I prefer to separate it into a distinct styled file. This approach helps maintain clean and manageable code. It's important to evaluate each component individually to determine the most efficient organization of CSS and component code.

### Test

- A significant amount of unit tests have been implemented using React Testing Library and Jest. Due to time constraints, it was not possible to achieve 100% test coverage, but efforts were made to cover as much functionality as possible.

- Two integration tests were successfully created for the `addClient` feature. Work was initiated on two integration tests for the `editClient` feature, but they could not be completed due to lack of time and some issues with the Mock Service Worker (MSW). The encountered error was 'ReferenceError: TextEncoder is not defined'. These tests are marked with a '@todo' comment for future implementation.

- Due to the limited timeframe, no end-to-end (E2E) tests were implemented. However, tools like Cypress or Playwright could be used for this purpose in future development stages.

- The following scripts are available for running the tests:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

### Future Improvements

#### @Todo

- A search for '@todo' in the codebase will reveal areas that require further refinement. These markers indicate potential enhancements or necessary adjustments that were identified during development.

- While significant effort has been made to adhere to clean code principles such as DRY (Don't Repeat Yourself), KISS (Keep It Simple, Stupid), and SOLID, there is always room for improvement. Due to time constraints, some aspects of the code were developed more hastily than ideal. Future iterations of this project will focus on further refactoring and optimization.

#### Others

- Enhance the existing layout for improved user experience.
- Introduce different layout options to cater to various user preferences.
- Implement a user registration and login system for personalized experiences.

```

```
