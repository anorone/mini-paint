### CI/CD status
[![linter](https://github.com/anorone/mini-paint/actions/workflows/linter.yml/badge.svg?branch=dev)](https://github.com/anorone/mini-paint/actions/workflows/linter.yml)
[![deploy](https://github.com/anorone/mini-paint/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/anorone/mini-paint/actions/workflows/deploy.yml)

# Paint

## Requirements
The requirements to the application are described [here](https://drive.google.com/file/d/19cb4whI_HUVPzuaPyaj5r6hGotIVnhho/view).

## How to run the app
Live demo is available at [https://mini-paint-inn23.web.app/](https://mini-paint-inn23.web.app/).

## Database snapshot
Entities in the database are structured as follows:
```
{
  drawings: {
    [drawingId]: {
      id: string,
      name: string,
      dataUrl: string,
      authorId: string,
      timestamp: number,
    }
      ... // other drawings
  }
  users: {
    [userId]: {
      id: string,
      firstName: string,
      lastName: string,
      drawings: {
        [drawingId]: boolean,
      }
    }
      ... // other users
  }
}
```

## Application stack
Besides **Firebase** platform and **React** library (create-react-app with **Typescript** was used as a starting template) the following tools were applied for developing the application:
- **Redux Toolkit** for storing and managing the application data;
- **React Router** for client-side routing;
- **Material UI** components and icons formed the basis of application interface;
- **React Hook Form** library was utilized to handle form data;
- **Lodash.js** utility functions - to facilitate the developing process;
- **Prettier** in conjunction with **ESLint** was used as a primary formatting tool;
