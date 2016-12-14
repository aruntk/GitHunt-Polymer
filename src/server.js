import Express from 'express';
const basePort = process.env.PORT || 3000;
const apiHost = `http://localhost:${basePort + 10}`;
const apiUrl = `${apiHost}/graphql`;

const app = new Express();
app.use(Express.static(path.join(process.cwd(), 'static')));

const apiProxy = proxy({ target: apiHost });
app.use('/graphql', apiProxy);
app.use('/graphiql', apiProxy);
app.use('/login', apiProxy);
app.use('/logout', apiProxy);


