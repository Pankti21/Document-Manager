import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";

function Login() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const onSubmit = () => {

    }

    return (
        <div className="m-5">
            <div className="h2">Login</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Email Id</Form.Label>
                    <Form.Control type="email" placeholder="Email"  {...register("email")}/>
                </Form.Group>
                {errors.email && <span>This field is required</span>}
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password")}/>
                </Form.Group>
                <Button variant="primary" className="mt-2">Login</Button>
            </form>
        </div>
    )

}

export default Login;