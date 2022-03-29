<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 

# Project: UrbanScape (Assignment 3)

Assignment-3

* *Date Created*: 27 MAR 2022
* *Last Modification Date*: 28 MAR 2022
* *Assignment URL*: <https://dal.brightspace.com/d2l/le/content/203602/viewContent/2836235/View>

* *Git URL for Frontend*: <https://git.cs.dal.ca/ppandey/group-13_csci5709>

* *Git URL for Backend*: <https://git.cs.dal.ca/psorathiya/group-13_csci5709_backend>


## Deployment

* *Deployment Link Frontend*: <https://g13-urbanscape.herokuapp.com/>

* *Deployment Link Backend*: <https://g13-urbanscape-backend.herokuapp.com/>


## Authors

* [Rikin Pineshkumar Patel](rk947420@dal.ca) - *(Developer - Student at Dalhousie University)*


## Features Developed

* Professional Dashboard
* User Support - Contact Us

## Features Link

* Professional Dashboard: <https://g13-urbanscape.herokuapp.com/professional>
* User Support: <https://g13-urbanscape.herokuapp.com/support>

*NOTE: User Authentication feature is yet to be integrated so the features are accessible without signing in.*

## Files Created

Frontend:
* src/pages/customer/support/Contact.js
* src/pages/customer/support/styles.css
* src/pages/professional/dashboard/Dashboard.css
* src/pages/professional/dashboard/Dashboard.js
* src/pages/professional/dashboard/DashboardPrimary.js

Backend:
* controllers/professional/support.js
* models/professional/Contactus.js
* routes/professional/support.js


# Getting Started with Create React App

This project was created with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### `npm run build` fails to minify


## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* [Reactjs](https://reactjs.org/) - The web framework used(Frontend)
* [Nodejs](https://nodejs.org/en/) - Dependency Management(Node modules)(Backend)
* [Visual Studio Code](https://code.visualstudio.com/) - Used as code editor while development

## Sources Used

Watched this video: <https://dal.brightspace.com/d2l/le/content/203602/viewContent/2836335/View> on Brightspace(Nodejs and Express tutorial) for backend development

Referred website for react routing: https://v5.reactrouter.com/web/guides/quick-start

Line no: 65-131(File: *src/pages/customer/support/Contact.js* ), I have used the code for the material UI web form from below mentioned website link and edited according to the need of the Contact Us Page for the application. Referred website: <https://codesandbox.io/s/ksw2n?file=/src/App.js:178-200> for creating ContactUs.js page frontend

Line no: 3-6(File: *src/pages/customer/support/styles.css* ), I have used the code from <https://codesandbox.io/s/ksw2n?file=/src/styles.css> 

## Acknowledgments

* Thank you to Professor Gabriella Mosquera and course CSCI 5709 TA's for transfering their knowledge and evaluating my work. 
* Thanks to reactjs.org and react tutorials on brightspace to provide easy to understand react knowledge.