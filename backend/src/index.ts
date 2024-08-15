import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';



// Create the main Hono app
const app = new Hono<{   //whenever definig hone pass that specifc as generic here
	Bindings: {
		DATABASE_URL: string;
    	JWT_SECRET: string;
	}
}>();

app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);	




export default app;
