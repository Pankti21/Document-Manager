import {Controller, useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import * as yup from "yup";
import {validateYupSchema} from "../../../commonUtils";
import {yupResolver} from "@hookform/resolvers/yup";


function Register() {

    const schema = yup.object({
        firstName: validateYupSchema("text", "firstName"),
        lastName: validateYupSchema("text", "lastName"),
        email: validateYupSchema("email", "email"),
        password: validateYupSchema("password", "password"),
    }).required();

    const {handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <div className="m-5">
            <div className="h2">Register</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Controller
                        defaultValue=""
                        name="firstName"
                        control={control}
                        render={({field}) =>
                            (

                                <Form.Control type="text" placeholder="First Name" {...field} />
                            )
                        }
                    />
                </Form.Group>
                <p className="errors">{errors.firstName?.message}</p>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Controller
                        defaultValue=""
                        name="lastName"
                        control={control}
                        render={({field}) =>
                            (

                                <Form.Control type="text" placeholder="Last Name" {...field} />
                            )
                        }
                    />
                </Form.Group>
                <p className="errors">{errors.lastName?.message}</p>
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
                <Button variant="primary" type="submit" className="mt-2">Register</Button>
            </form>
        </div>
    )

}

export default Register;