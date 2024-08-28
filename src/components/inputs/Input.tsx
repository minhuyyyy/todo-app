//validator
import { UseFormRegister } from 'react-hook-form';

//component
import { Form, InputGroup } from 'react-bootstrap';

//types
import { Inputs } from '@/types/Input';

function Input({
    type = 'text',
    placeholder,
    id,
    value,
    onChange,
    register,
}: {
    type?: string;
    placeholder?: string;
    id: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    register?: UseFormRegister<Inputs>;
}) {
    return (
        <InputGroup className='mb-3'>
            <Form.Control
                type={type}
                {...(register
                    ? register(id as keyof Inputs, {
                          required: `${placeholder} is required`,
                      })
                    : {})}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </InputGroup>
    );
}

export default Input;
