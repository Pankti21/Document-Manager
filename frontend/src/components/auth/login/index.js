import {Controller, useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import * as yup from "yup";
import {validateYupSchema} from "../../../commonUtils";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginUser, registerUser} from "../../../redux/actions";
import {useDispatch} from "react-redux";


function Login() {

    const schema = yup.object({
        email: validateYupSchema("email", "email"),
        password: validateYupSchema("password", "password"),
    }).required();

    const {handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();

    const onSubmit = (values) => {
        dispatch(loginUser(values));
    }

    return (
        <div className="m-5">
            <div className="h2">Login</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Email Id</Form.Label>
                    <Controller
                        defaultValue=""
                        name="email"
                        control={control}
                        render={({field}) =>
                            (

                                <Form.Control type="email" placeholder="Email" {...field} />
                            )
                        }
                    />
                </Form.Group>
                <p className="errors">{errors.email?.message}</p>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Controller
                        defaultValue=""
                        name="password"
                        control={control}
                        render={({field}) =>
                            (

                                <Form.Control type="password" placeholder="Password" {...field} />
                            )
                        }
                    />
                </Form.Group>

                <p className="errors">{errors?.password?.message}</p>
                <Button variant="primary" type="submit" className="mt-2">Login</Button>
            </form>
        </div>
    )

}

export default Login;