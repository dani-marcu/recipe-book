import {initApp} from './app.mjs';

const app = initApp();

app.listen(process.env.PORT, () => {
    console.log('Server is up on port ' + process.env.PORT);
});





